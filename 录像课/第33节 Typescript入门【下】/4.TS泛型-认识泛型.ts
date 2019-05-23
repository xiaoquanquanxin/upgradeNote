//  强制返回值类型,any的话无意义
//function Hello(num:number):number {
//    return num;
//}


//  泛型
function Hello<T>(arg:T):T {
    return arg;
}
//  在我需要指定类型的时候,再去调用的时候,指定类型
let output = Hello<string>('james');
console.log(output);