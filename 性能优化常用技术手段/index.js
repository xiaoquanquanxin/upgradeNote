function test(xx) {
	// console.log(xx);
	return xx;
}

Function.prototype.beforeCall = function (fn) {
	let __self = this;
	return function () {
		fn();
		return __self.apply(__self, arguments);
	}
};
Function.prototype.endCall = function (fn) {
	let __self = this;
	return function () {
		let __return = __self.apply(__self, arguments);
		fn();
		return __return;
	};
};
test.endCall(function () {
	// console.log('end');
	console.timeEnd('执行时间');
}).beforeCall(function () {
	// console.log('before');
	console.time('执行时间');
})('中间');
