const express = require('express');
const app = new express();
const http = require('http').Server(app);
const io = require('socket.io')(http);

app.use('/', function (req, res) {
	res.sendfile('iii.js.html');
});

io.on('connection', function (socket) {
	socket.emit('open');
	socket.on('message', function (msg) {
		if (!msg) {
			return
		}
		console.log('服务端接收到', msg);
		socket.emit('james', msg + '&emsp;&emsp;&emsp;' + new Date().getMinutes() + ':' + new Date().getSeconds());
		socket.broadcast.emit('james', msg + '&emsp;&emsp;&emsp;' + new Date().getMinutes() + ':' + new Date().getSeconds())
	});
});

http.listen(4000, function () {
	console.log('listening on *:4000');
});
// app.listen(3000, function () {
// 	console.log('listen')
// });