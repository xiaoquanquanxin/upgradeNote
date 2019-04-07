/****
 * 中间件
 * **/
const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
app.use(cookieParser());


app.get('/index/:id', function (req, res, next) {
	alert(123);
	req.data = 123;
	// next('route');
	next();
}, function (req, res, next) {
	console.log(req.data, 111);
	// next();
	res.send('如果上一个中间件有next(route)，就不会执行');
});

app.get('/index/:id', function (req, res, next) {
	console.log('中间件2');
	res.send('中间件2')
});

app.use(function (err, req, res, next) {
	console.error(err.stack);
	res.status(500).send(`服务器维护中，cookie${JSON.stringify(req.cookies)}`);
});


const server = app.listen(8081, function () {
	const host = server.address().address;
	const port = server.address().port;
	console.log(host);
	console.log("应用实例，访问地址为 http://%s:%s", host, port)
});


