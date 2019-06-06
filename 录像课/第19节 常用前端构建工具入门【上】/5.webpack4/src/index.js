// import imgConfiguration from './assets/js/common/configuration';


import {join} from 'lodash';
import printMe from './print.js';

function component() {
    let element = document.createElement('div');
    let btn = document.createElement('button');

    element.innerHTML =  join(['james', 'leborn'], ' 慕斯 ');

    btn.innerHTML = '点击这里，然后查看 console！';
    btn.onclick = printMe;
    element.appendChild(btn);

    return element;
}

document.body.appendChild(component());
// console.log(imgConfiguration);



