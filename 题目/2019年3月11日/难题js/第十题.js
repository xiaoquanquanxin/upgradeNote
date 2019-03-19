console.clear();

let timeout = (ms) => {
	return new Promise((res, rej) => {
		setTimeout(res, ms)
	})
};
var atiem = 1111;
let a = () => timeout(atiem).then(() => {
	console.log(1);
	return atiem;
});
var btime = 222;
let b = () => timeout(btime).then(() => {
	console.log(2);
	return btime;
});
var ctime = 1111;
let c = () => timeout(ctime).then(() => {
	console.log(3);
	return ctime;
});


//  es6解法
// let mymerge = (arr) => {
// 	return ( async function () {
// 		var _arr = [];
// 		for (var obj of arr) {
// 			_arr.push(await  obj())
// 		}
// 		return _arr;
// 	}());
// 	//return Promise.all(arr.map((t)=>t()));
// };


let slice = [].slice;
function mymerge(arr) {
	mymerge.arr = mymerge.arr || [];
	if (arr.length) {
		var item1 = arr[0];
		var item = item1().then((val) => {
			mymerge.arr.push(val);
			return mymerge(slice.call(arr, 1));
		});
		return item
	} else {
		return {
			then: function (fn) {
				fn(mymerge.arr);
			}
		}
	}
}


mymerge([a, b, c]).then((data) => {
	console.log('done');
	console.log(data);
});
