//  泛型类
(()=> {
    class HelloNumber<T> {
        z:T;
        add:(x:T, y:T)=>T;
    }
    let myHelloNumber = new HelloNumber<string>();
    myHelloNumber.z = '1561';
    myHelloNumber.add = function (x, y?) {
        return x + y;
    };
    console.log(myHelloNumber.z);
    console.log(myHelloNumber.add('x', myHelloNumber.z));
})();

