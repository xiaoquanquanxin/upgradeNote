let http = require('http');
let server = http.createServer((req, res) => {
	for (var i = 0; i < 1000; i++) {
		server.on('request', function jjjjjjjjjjjjj () {
			console.log(`当前请求 ` + i);
		})
	}
	res.end('你好世界');
});
server.listen(8080);
server.setMaxListeners(0);
console.log(process.pid);