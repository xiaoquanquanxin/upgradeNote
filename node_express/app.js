const express = require('express');
const app = express();

app.get('/', function (req, res) {
	console.log(req.query);
	res.send(`首页${JSON.stringify(req.query)}`);
});
//  接收前端路由
app.get('/hello/:id', function (req, res) {
	res.send(`仅有hello${req.params.id}`);
});
//  json
app.get('/json', function (req, res) {
	res.json({
		name: 123,
		age: 123
	})
});
//  render
app.get('/render', function (req, res) {
	//  res.render(view,[locals],callback)：渲染一个view，同时向callback传递渲染后的字符串，如果在渲染过程中有错误发生next(err)将会被自动调用。callback将会被传入一个可能发生的错误以及渲染后的页面，这样就不会自动输出了。
});
//  静态资源
app.use(express.static('public'));
app.get('/static', function (req, res) {
	res.send('hello node');
});
const server = app.listen(8081, function () {
	const host = server.address().address;
	const port = server.address().port;
	console.log(host);
	console.log("应用实例，访问地址为 http://%s:%s", host, port)
});


