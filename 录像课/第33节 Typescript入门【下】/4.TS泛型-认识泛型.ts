//  强制返回值类型,any的话无意义
//  泛型
function Hello<T>(arg:T):T {
    return arg;
}
//  在我需要指定类型的时候,再去调用的时候,指定类型
let output = Hello<string>('james');
console.log(output);

//  应用
function Hi<T>(num:T[]):T[] {
    console.log(num.length);
    return num;
}

let list:Array<string> = Hi<string>(['x1', 'x2']);
for (let i = 0; i < list.length; i++) {
    console.log(list[i]);
}

//  泛型类型
function fan<T>(arg:T):T {
    return arg;
}
let fanHello:<K>(arg:K)=>K = fan;
console.log(fanHello('xxx'));


//  LAN表达式
let myFn:(a:number)=>string = function (a:number):string {
    return 'x' + a;
};
console.log(myFn(1));

let myHello:{<T>(arg:T):T} = fan;
console.log(myHello(123));

//  接口中包含一个泛型的函数
interface Hello {
    <T>(arg:T):T;
}
function myHe<T>(arg:T):T {
    return arg;
}

let Mh:Hello = myHe;
console.log(Mh<string>('mfh'));
