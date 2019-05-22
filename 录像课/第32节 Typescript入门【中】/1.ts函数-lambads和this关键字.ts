//  lamda函数
let people = {
    names: ['james', 'pierce', 'bryant', 'micheal'],
    getName: function () {
        return ()=> {
            let i = Math.floor(Math.random() * 4);
            return {
                n: this.names[i]
            }
        }
    }
};
let myName = people.getName();
console.log(myName().n);


//  函数的重载
function attr(name:string):string;
function attr(name:number):number;
function attr(name:boolean):boolean;
function attr(age:any):any {
    if (age && typeof age === "number") {
        return age + '年龄';
    } else {
        return age;
    }
}

console.log(attr(17));
console.log(attr(true));


//  类的创建
class Person {
    name:string;
    age:number;

    constructor(name:string, age:number) {
        this.name = name;
        this.age = age;
    }

    print() {
        return this.name + '今年' + this.age + '岁';
    }
}

let person = new Person('quanxin', 15);
console.log(person);
console.log(person.print());


//  类的继承
class Student extends Person {
    school:string;

    constructor(name:string, age:number, school:string) {
        super(name, age);
        this.school = school;
    }

    goToSchool() {
        return this.name + this.age + this.school;
    }
}
let student = new Student('皮尔斯', 60, '啥学校？');
console.log(student);
console.log(student.goToSchool());


//  访问修饰符
//  public
//  private
class People {
    public name:string;
    public age:number;

    constructor(name:string, age:number) {
        this.name = name;
        this.age = age;
    }

    print() {
        return this.name + this.age;
    }
}

class Teacher extends People {
    private  school:string;

    constructor(name:string, age:number, school:string) {
        super(name, age);
        this.school = school;
    }

    print() {
        return this.name + this.age + this.school;
    }
}

let t = new Teacher('小卡', 40, '多伦多');
console.log(t.print());



