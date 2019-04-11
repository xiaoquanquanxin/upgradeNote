console.log(`全局对象${global}`);

console.log(`具体文件${__filename}`);
console.log(`具体目录${__dirname}`);
const timer = setTimeout(function () {
	console.log(timer);
}, 100);
clearTimeout(timer);


//  示例
process.on('exit', function (code) {

	// 以下代码永远不会执行
	setTimeout(function () {
		console.log("该代码不会执行");
	}, 0);

	console.log('退出码为:', code);
});
console.log("程序执行结束");


//  常用工具函数
(function () {
	//  inherits，垃圾
	return;
	const util = require('util');

	function Base() {
		this.name = 'base';
		this.base = 1991;
		this.sayHello = function () {
			console.log('Hello ' + this.name);
		};
	}

	Base.prototype.showName = function () {
		console.log(this.name);
	};

	function Sub() {
		this.name = 'sub';
	}

	util.inherits(Sub, Base);
	console.log('****************************');
	var objSub = new Sub();
	objSub.showName();
	objSub.showName();
	console.log('****************************');
}());

(function () {
	var util = require('util');
	function Person() {
		this.name = 'byvoid';
		this.toString = function() {
			return this.name;
		};
	}
	var obj = new Person();
	console.log(util.inspect(obj));
	console.log(util.inspect(obj, true));
}());