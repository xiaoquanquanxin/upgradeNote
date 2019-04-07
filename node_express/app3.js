const express = require('express');
const app = new express();

(function () {
	//  组合路由
	const cb0 = function (req, res, next) {
		console.log('CB0');
		next()
	};
	const cb1 = function (req, res, next) {
		console.log('CB1');
		next()
	};

	const cb2 = function (req, res, next) {
		console.log('CB2');
		next();
	};
	app.get('/example/c', [cb0, cb1, cb2], function (req, res) {
		res.send('啊啊啊');
	});
}());


const server = app.listen(8081, function () {
	const host = server.address().address;
	const port = server.address().port;
	console.log(host);
	console.log("应用实例，访问地址为 http://%s:%s", host, port)
});