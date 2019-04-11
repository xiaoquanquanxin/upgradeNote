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


(function () {
	//  由于路径是在单个位置指定的，因此创建模块化路由很有帮助，同时减少冗余和拼写错误
	app.route('/book')
		.get(function (req, res) {
			res.send('Get a random book')
		})
		.post(function (req, res) {
			res.send('Add a book')
		})
		.put(function (req, res) {
			res.send('Update the book')
		});
}());

const router = express.Router();

(function () {
	//  模块化
	router.use(function (req, res, next) {
		next();
	});
	router.get('/', function (req, res) {
		res.send('1');
	});
	module.exports = router;
}());


const server = app.listen(8081, function () {
	const host = server.address().address;
	const port = server.address().port;
	console.log(host);
	console.log("应用实例，访问地址为 http://%s:%s", host, port)
});