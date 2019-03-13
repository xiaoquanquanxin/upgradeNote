console.clear();

let timeout = (ms) => {
    return new Promise((res, rej)=> {
        setTimeout(res, ms)
    })
};
var atiem = 1111;
let a = ()=>timeout(atiem).then(()=> {
    console.log(1);
    return atiem;
});
var btime = 222;
let b = ()=>timeout(btime).then(()=> {
    console.log(2);
    return btime;
});
var ctime = 1111;
let c = ()=>timeout(ctime).then(()=> {
    console.log(3);
    return ctime;
});


let mymerge = (arr)=> {
    return ( async function () {
        for (var obj of arr) {
            await  obj();
        }
        return arr;
    }());
    //return Promise.all(arr.map((t)=>t()));
};

mymerge([a, b, c]).then((data)=> {
    console.log('done');
    console.log(data);
});