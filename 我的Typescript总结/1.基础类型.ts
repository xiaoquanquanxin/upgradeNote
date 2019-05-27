//  布尔值
let isBoolean: boolean = false;
//  数字
let isNumber: number = 1;
//  字符串
let isString: string = 'str';
let isString1: string = `xx`;
let isString2: string = `${isString}`;
//  数组
let isNumberArray: number[] = [1, 2, 3];
//  Array<元素类型>是数组泛型
let isNumberList: Array<number> = [1, 2, 3];
let isStringArray: string[] = ['1', '2', '3'];
//  Array<元素类型>是数组泛型
let isStringList: Array<string> = ['1', '2', '3'];

//  元组 Tuple--- 已知  元素数量和类型的数组,数组成员的类型和数量是固定的
let isTupleArray: [string, number] = ['4', 3];
isTupleArray.push('world');
isTupleArray.splice(0, 1);


//  枚举
enum Color {
    Red, Green, Blue
}

let e1: Color = Color.Blue;

//  可以手动的指定成员的数值
enum Color2 {
    Red = 5,
    Green = 3,
    Redd,
    Reddd = 6
}

//  自然增加索引，相同的索引，会被后面的成员覆盖
console.log(Color2[5]);


//  any
let isAnyList: any[] = [1, true, "free"];

//  Object类型的变量只是允许你给它赋任意值,但是却不能够在它上面调用任意的方法,即便它真的有这些方法
let prettySure: Object = 4;

//  void,没有类型,null,undefined,用处不大
//  当你指定了--strictNullChecks标记，null和undefined只能赋值给void和它们各自
let isVoid: void = void 0;
isVoid = void 0;
isVoid = undefined;
let isUndefined: undefined = undefined;
let isNull: null = null;

//  never,类型表示的是那些永不存在的值的类型
//  never类型是那些总是会抛出异常,或根本就不会有返回值的函数表达式,或箭头函数表达式的返回值类型
function error(message: string): never {
    throw new Error(message);
}

//  抛出异常后，没有打印
console.log(error(''));


//  类型断言
//  通过类型断言这种方式可以告诉编译器，“相信我，我知道自己在干什么”
//  它没有运行时的影响，只是在编译阶段起作用
let someValue: any = "this is a string";
let strLength1: number = (<string>someValue).length;
let strLength2: number = (someValue as string).length;
let strLength3: number = someValue.length;















