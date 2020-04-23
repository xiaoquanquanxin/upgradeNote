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
        this._class = _class;
    }

    say_protected() {
        return this._protected;
    }

    say_private() {
        // return this._private;
    }
}

const s = new Student('权鑫', 13, '小学');
console.log(s.say_protected());
console.log(s.say_private());