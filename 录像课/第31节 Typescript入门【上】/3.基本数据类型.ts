let isDone:boolean;

let height:number = 1;
console.log(height);

let str:string = 'xxx';
console.log(str);

let list1:number[] = [1, 2, 3];
console.log(list1, list1[1]);

let list2:Array<string> = ['xxx', 'eee'];
//let list2:Array<string> = ['xxx', 1, 'eee'];
console.log(list2);


enum Color {'x' = 1, 'green' = 2, 'blue' = 4}
let colorName:string = Color[2];
let c:Color = Color['green'];
console.log(colorName, c);

let is:number = 123;
let notSure:any = 22;
let list3:Array<any> = [1, '2'];
let list4:any[] = [1, [4, list3]];
console.log(list4);

function tell():string {
    return 'xx';
}

function fn():void {
    return undefined;
}