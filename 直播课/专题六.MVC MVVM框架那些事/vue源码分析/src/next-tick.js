/* @flow */
/* globals MutationObserver */

import { noop } from 'shared/util';
import { handleError } from './error';
import { isIE, isIOS, isNative } from './env';

const callbacks = [];
let pending = false;

function flushCallbacks(){
    pending = false;
    const copies = callbacks.slice(0);
    callbacks.length = 0;
    for (let i = 0; i < copies.length; i++) {
        copies[i]();
    }
}

//  这里我们使用微任务使用异步延迟包装器。
//  在2.5中，我们使用(宏)任务(与微任务结合使用)。
//  但是，当状态在重新绘制之前被更改时，它会有一些微妙的问题
//  (例如#6813，输出转换)。此外，在事件处理程序中使用(宏)任务会导致一些奇怪的行为
//  不能规避(例如#7109、#7153、#7546、#7834、#8109)。
//  因此，我们现在再次在任何地方使用微任务。
//  这种权衡的一个主要缺点是存在一些场景
//  微任务的优先级过高，并在两者之间被触发
//  顺序事件(例如#4521、#6690，它们有解决方案)
//  甚至在同一事件的冒泡(#6566)之间。
let timerFunc;

//  nextTick行为利用了可以访问的微任务队列
//  通过任何一个原生承诺。然后或MutationObserver。
//   MutationObserver获得了更广泛的支持，但它受到了严重的干扰
//   UIWebView在iOS >= 9.3.3时触发的触摸事件处理程序。它
//  触发几次后完全停止工作…所以,如果本地
//   Promise可用，我们将使用:
// 忽略下一个，$flow-disable-line */
if (typeof Promise !== 'undefined' && isNative(Promise)) {
    const p = Promise.resolve();
    timerFunc = () => {
        p.then(flushCallbacks);
//  //在有问题的UIWebViews中，承诺。然后不完全打破，但是
//  它可能陷入一种奇怪的状态，即回调被推入
//  但是队列不会被刷新，直到浏览器刷新
//  需要做一些其他的工作，例如处理定时器。因此,我们可以
//  通过添加空计时器来“强制”刷新微任务队列。
        if (isIOS) setTimeout(noop);
    };
} else if (!isIE && typeof MutationObserver !== 'undefined' && (
    isNative(MutationObserver) ||
    // PhantomJS and iOS 7.x
    MutationObserver.toString() === '[object MutationObserverConstructor]'
)) {
    //在原生承诺不可用的情况下使用MutationObserver，
//例如PhantomJS, iOS7, android4.4
// (#6466 MutationObserver在IE11中不可靠)
    let counter = 1;
    const observer = new MutationObserver(flushCallbacks);
    const textNode = document.createTextNode(String(counter));
    observer.observe(textNode, {
        characterData: true
    });
    timerFunc = () => {
        counter = (counter + 1) % 2;
        textNode.data = String(counter);
    };
} else if (typeof setImmediate !== 'undefined' && isNative(setImmediate)) {
    //  退回到setimmediation。
    //  技术上它利用了(宏)任务队列，
    //  但它仍然是比setTimeout更好的选择。
    timerFunc = () => {
        setImmediate(flushCallbacks);
    };
} else {
    //  回退到setTimeout。
    timerFunc = () => {
        setTimeout(flushCallbacks, 0);
    };
}

export function nextTick(cb, ctx){
    let _resolve;
    callbacks.push(() => {
        if (cb) {
            try {
                cb.call(ctx);
            } catch (e) {
                handleError(e, ctx, 'nextTick');
            }
        } else if (_resolve) {
            _resolve(ctx);
        }
    });
    if (!pending) {
        pending = true;
        timerFunc();
    }
    if (!cb && typeof Promise !== 'undefined') {
        return new Promise(resolve => {
            _resolve = resolve;
        });
    }
}