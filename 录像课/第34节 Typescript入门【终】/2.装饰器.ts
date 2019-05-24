//  修饰器对类的行为的改变，是代码编译时发生的，而不是在运行时。
//  这意味着，修饰器能在编译阶段运行代码。
//  也就是说，修饰器本质就是编译时执行的函数。
(()=> {
    function hello(target) {
        target.prototype.propHello = 'musi';
        //console.log(target);
    }

    @hello
    class Y {

    }
    let y = new Y;
    //console.log(Y, y);
})();

//  装饰器工厂函数
(()=> {
    function color(value:string) {
        return function (target) {
            target.color = value;
        }
    }
})();

//  多个装饰器
(()=> {
    return
    function f(target) {
        console.log(f)
    };
    function g(target) {
        console.log(g)
    };
    @f
    @g
    class Y {

    }
})();

//  多个装饰器工厂函数
(()=> {
    return
    function f(params:string) {
        console.log(1);
        return function (target) {
            console.log(f)
        }
    }

    function g(params:string) {
        console.log(2);
        return function (target) {
            console.log(g)
        }
    }

    @f('f')
    @g('g')
    class Y {

    }
})();


//  方法装饰器.有三个参数
//  1.对静态成员来说是类的构造函数,对于实例成员是类的原型对象
//  2.成员的名字
//  3.成员的描述
(()=> {
    return
    //  修饰器工厂函数
    let enumerable = (value:boolean) => {
        return (target:any, propertyKey:string, descriptor:PropertyDescriptor)=> {
            descriptor.enumerable = value;
        }
    };

    class Greeter {
        greeting:string;

        constructor(message:string) {
            this.greeting = message;
        }

        @enumerable(false)
        greet() {
            return 'xx' + this.greeting;
        }
    }
    let g = new Greeter('msg');
    console.log(g.constructor.prototype);
})();

//  访问器修饰器
//  三个参数,与方法修饰器类似
(()=> {
    return
    let configurable = (value:boolean)=> {
        return (target:any, propertyKey:string, descriptor:PropertyDescriptor)=> {
            descriptor.configurable = value;
        }
    };
    class Point {
        private _name:string;
        @configurable(false)
        get name() {
            return this._name
        }
    }
    let p = new Point;
    console.log(p);
})();

//  属性修饰器
//  两个参数
//  1.对于静态成员来说是构造函数，对于实例成员是原型对象
//  2.属性名字
(()=> {
    return
    let propDes = (value:any)=> {
        return (target:any, propertyKey:string)=> {
            target[propertyKey] = target[propertyKey] || 1;
            target[propertyKey] += value;
        };
    };
    class Point {
        @propDes(1)
        static staticX:number = 2;
        @propDes(1)
        prototypeX:number = 1;

        constructor() {
            this.prototypeX = 1;
        }
    }

    let p = new Point;
    //console.log(Point.staticX)
    //console.log(Point.staticX, p);
})();

//  参数修饰器
//  第三个参数：
//  第三个参数是 参数在函数参数列表中的索引
//  参数修饰器只能监听一个参数的传入
(()=> {

    let require = (value)=> {
        return (target:any, fnName:string, index:number)=> {
            console.log(target);
            console.log(fnName);
            console.log(target[fnName].length);
            console.log(index);
            console.log(value);
        }
    };
    class Point {
        age:number;

        fn(@require(true) age:number) {
            this.age = age;
        }
    }

    let p = new Point;
})();






















