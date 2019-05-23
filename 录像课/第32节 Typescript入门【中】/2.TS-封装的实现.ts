//  私有属性
class Hello {
    private _name:string;

    tell() {
        return this.name;
    }

    get name():string {
        return this._name;
    }

    set name(newName:string) {
        this._name = newName;
    }

}
let hello = new Hello();
hello.name = 'james';
console.log(hello);
console.log(hello.name);


//  静态属性
class Person {
    static myName:string;

    tell() {
        console.log('姓名' + Person.myName);
    }
}
let p = new Person();
Person.myName = 'james';
p.tell();


class Greeter {
    greeting:string;

    constructor(message:string) {
        this.greeting = message;
    }

    greet() {
        return 'hello' + this.greeting;
    }
}
//  声明为某种数据类型,声明g的数据类型为Greeter
let g:Greeter;
g = new Greeter('james');
console.log(g);




















