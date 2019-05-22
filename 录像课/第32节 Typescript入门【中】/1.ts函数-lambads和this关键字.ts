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



