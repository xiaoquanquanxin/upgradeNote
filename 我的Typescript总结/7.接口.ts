//  ts核心之一，类型检查
(() => {
    interface Label {
        label: string;
        name?: string;
    }

    function a(label: Label) {
        console.log(label);
    }

    a({label: '权鑫', name: 'q'});
    a({label: '权鑫'});
})();

//  函数
(() => {
    interface intFn {
        (a: string, b: boolean): boolean;
    }

    let fn: intFn = function (a: string, b: boolean) {
        return b;
    }
    console.log(fn('', true));
})();

//  数组
(() => {
    interface StringArray {
        [index: number]: string | number
    }

    const arr: StringArray = ['', 0];
    console.log(arr,);
})();

//  接口实现class类型
(() => {
    interface ClockInterface {
        currentTime: Date,

    }

    class clock implements ClockInterface {
        public currentTime;

        constructor(currentTime) {
            this.currentTime = currentTime;
        }
    }

    const c = new clock(new Date(21));
    console.log(c);
})();


//  接口的继承、混合
(() => {
    interface Shape {
        color: string;
    }

    interface Stroke {
        width: number;
    }

    interface Block extends Shape, Stroke {
        sideLength: number,
        _fn: void;

        fn(): void;
    }

    const s = <Block>{
        color: 'red',
        width: 2,
        _fn: undefined,
        fn() {
        }
    };
    console.log(s);
})();

//  泛型，在定义的时候，不需要明确指定类型。在调用的时候，才指定类型
(() => {
    function Hello<T>(arg: T): T {
        return arg;
    }

    const output = Hello<string>('str');
    console.log(output);

})();
