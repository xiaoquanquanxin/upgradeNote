//  多继承
interface Shape {
    color:string;
}
interface PenStroke {
    penWidth: number;
}
interface Square extends Shape,PenStroke {
    sideLength:number;
}
let s = <Square>{};
s.color = 'blue';
s.sideLength = 10;
s.penWidth = 10;
console.log(s);

//  混合类型    一个例子就是，一个对象可以同时做为函数和对象使用，并带有额外的属性。
interface Counter {
    (start:number): string;
    interval: number;
    reset(): void;
}

function getCounter():Counter {
    let counter = <Counter>function (start:number) {
        console.log(start)
    };
    counter.interval = 123;
    counter.reset = function () {
        this.interval = 0
    };
    return counter;
}

let c = getCounter();
c(10);
c.interval = 5;
c.reset();
console.log(c.interval);