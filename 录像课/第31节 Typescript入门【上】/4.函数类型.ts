function add(x:number, y:number):string {
    return x + y + '';
}
console.log(add(1, 6));

let myAdd = function (a:number, y:number):number {
    return 123;
};
//  参数类型
let otherAddts:(name:string, age:number) => number = function (n:string, a:number):number {
    return a;
};
console.log(otherAddts('quanxin', 11));
function buildName(firstName:string, lastName:string):string {
    return firstName + ' ' + lastName;
}
console.log(buildName('james', 'lebron'));
function buildNames(firstName:string, lastName?:string):string {
    return firstName + (lastName ? ' ' + lastName : '');
}
console.log(buildNames('james'));
//console.log(buildName('james', 'lebron', '23'));

//  默认参数
function buildNameUn(firstName:string, lastName = 'pierce'):string {
    return firstName + '  ' + lastName;
}
console.log(buildNameUn('paul'));
console.log(buildNameUn('paul', 'pierce'));
//console.log(buildNameUn('paul', 'pierce', 1));

//  可变参数
function peopleName(firstName:string, ...restOfName:Array<any>):string {
    return firstName + '  ' + restOfName.join(' - ');
}
let pns = peopleName('xx', 'xxx', 'xxxx');
console.log(pns);