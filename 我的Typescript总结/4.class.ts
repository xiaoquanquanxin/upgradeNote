class Person {
    name: string;
    age: number;

    protected _protected: boolean;
    private _private: boolean;

    constructor(name: string, age: number) {
        this.name = name;
        this.age = age;
    }
}

class Student extends Person {
    _class: string;

    constructor(name: string, age: number, _class: string) {
        super(name, age);
        console.log(this);
        this._class = _class;
    }

    say_protected() {
        console.log();
        return this._protected;
    }

    say_private() {
        // return this._private;
    }
}

const s = new Student('权鑫', 13, '小学');
console.log(s.say_protected());
// console.log(s.say_private());
// console.log(Student._protected)
//  public      谁都可以访问
//  private     私有的，只有父类可以访问，要修改属性，通过父类的类的方法去修改
//  对于private的实现，是defineProperty，设置空的属性
//  protected   受保护的，只有父类和子类可以访问，要修改属性，通过父类的类的方法去修改


class Hello {

}
