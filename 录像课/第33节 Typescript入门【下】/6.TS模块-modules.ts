//  modules
//  模块化,可重用
//  封装变量和函数
//

interface StringValidator {
    isAcceptable(s:string):boolean;
}
let lettersRegexp = /^[A-Za-z]+$/;
let numbersRegexp = /^[0-9]$/;
class LettersOnValidator implements StringValidator {
    isAcceptable(s:string):boolean {
        return undefined;
    }
}
class ZipCodeValidator implements StringValidator {
    isAcceptable(s:string):boolean {
        return s.length === 5 && numbersRegexp .test(s);
    }
}

//  模块
module  Validation {
    export interface StringValidator {
        isAcceptable(s:string):boolean;
    }
    let lettersRegexp = /^[A-Za-z]+$/;
    let numbersRegexp = /^[0-9]$/;
    export class LettersOnlyValidator implements StringValidator {
        isAcceptable(s:string):boolean {
            return lettersRegexp.test(s);
        }
    }
    export class ZipCodeValidator implements StringValidator {
        isAcceptable(s:string):boolean {
            return s.length === 5 && numbersRegexp .test(s);
        }
    }
}
console.log(Validation);


//  模块泛型类
module Time {
    export class Test {
        element:HTMLElement;
        span:HTMLElement;
        timer:number;

        constructor(e:HTMLElement) {
            this.element = e;
            this.element.innerHTML = '现在时间是:';
            this.span = document.createElement('span');
            this.element.appendChild(this.span);
            this.span.innerHTML = new Date().toTimeString();
        }

        start() {
            this.timer = setInterval(()=>this.span.innerHTML = new Date().toTimeString(), 500);
        }

        stop() {

            clearInterval(this.timer);
        }
    }
}

console.log(Time);
let div = document.createElement('div');
let obj = new Time.Test(div);
console.log(obj);
obj.start();
document.body.appendChild(div);

























