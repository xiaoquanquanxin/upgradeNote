const express = require('express');
const app = new express();
const router = express.Router();


function logErrors(err, req, res, next) {
	// console.error('错误的log',err.stack);
	next(err)
}

function clientErrorHandler(err, req, res, next) {
	if (req.xhr) {
		res.status(500).send({error: 'Something failed!'})
	} else {
		next(err)
	}
}

function errorHandler(err, req, res, next) {
	res.status(500);
	res.send('我科尽力了');
}


(function () {
	//  模块化
	router.use(function (req, res, next) {
		next();
	});
	router.get('/', function (req, res) {
		res.sen('hello world');
	});
	app.use('/index', router);
}());
app.use(logErrors);
app.use(clientErrorHandler);
app.use(errorHandler);


const server = app.listen(8081, function () {
	const host = server.address().address;
	const port = server.address().port;
	console.log(host);
	console.log("应用实例，访问地址为 http://%s:%s", host, port)
});