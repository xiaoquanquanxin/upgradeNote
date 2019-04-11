const express = require('express');
const app = express();
const swig = require('swig');

//  静态资源
app.use(express.static('public'));
app.set('view engine', 'html');
app.engine('html', swig.renderFile);

app.get("/", function(req, res, next) {
	res.render('endex', {
		title: '权鑫的title',
		data: '权鑫的data,point guard ,shooting guard ,small forward , power forward , center'
	});
});


const server = app.listen(8081, function () {
	const host = server.address().address;
	const port = server.address().port;
	console.log(host);
	console.log("应用实例，访问地址为 http://%s:%s", host, port)
});


