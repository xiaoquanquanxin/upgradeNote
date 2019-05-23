//
//function printLabel(params:{label:string}) {
//    console.log(params.label);
//}
//let myObj = {label: 'hello'};
//printLabel(myObj);

//  创建接口
interface LabelValue {
    label:string;
}
function printLabel(params:LabelValue) {
    console.log(params.label);
}
let myObj = {label: 'xx'};
printLabel(myObj);


//  接口声明的时候决定了属性
//  可选属性，带？？
interface USB {
    name?:string;
    age:number;
}

function printUSB(pu:USB) {
    console.log(pu.name);
    console.log(pu.age);
}

let my = {
    //name: 'xxx',
    age: 11
};

printUSB(my);

//  函数类型
interface SearchFunc {
    (source:string, subString:string):boolean;
}

let mySearch:SearchFunc;
mySearch = function (source:string, subString:string) {
    let result = source.search(subString);
    return result !== -1;
};


//  数组类型
interface StringArray {
    [index:number]:string;
}
let myArray:StringArray;
myArray = ['aa','bb'];
console.log(myArray);



















