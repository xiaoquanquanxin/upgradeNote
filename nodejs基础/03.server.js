console.log('不能有中文路径！hello fff');

var http = require('http');

http.createServer(function (req, res) {
	//  返回头     状态码     返回头部信息，json格式
	res.writeHead(200, {'Content-Type': 'text/plain'});
	//  发送响应的数据
	res.end('hello world!\n');
}).listen(8888);

console.log('服务运行了');