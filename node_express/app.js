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
	res.sendFile(__dirname + "/views/" + "iii.js.html");
});
//  表单提交的位置
//  需要body-parser包
const bodyParser = require('body-parser');
// 创建 application/x-www-form-urlencoded 编码解析
const urlencodedParser = bodyParser.urlencoded({extended: false});
app.post('/form/action/index', urlencodedParser, function (req, res) {
	console.log(req.body);
	// res.send('1')
	// res.send(`提交成功${req.body}`);
	res.redirect(`https://www.baidu.com/s?wd=${req.body.username}&rsv_spt=1&rsv_iqid=0xcc7671160006ff70&issp=1&f=8&rsv_bp=1&rsv_idx=2&ie=utf-8&rqlang=cn&tn=baiduhome_pg&rsv_enter=1&oq=www&inputT=789&rsv_t=9f26fzzBeq073BVLGaSyrayvrn6jLk09tqgdA4YeKlrYwENStO8sRUr6TJ8TJCGfytD7&rsv_pq=f1e7bd8f00068d5f&rsv_sug2=0&rsv_sug4=1005`)
});
const server = app.listen(8081, function () {
	const host = server.address().address;
	const port = server.address().port;
	console.log(host);
	console.log("应用实例，访问地址为 http://%s:%s", host, port)
});


