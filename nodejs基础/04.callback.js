//  读取文件
let fs = require('fs');
(function () {
	return;
	console.log('阻塞式读取');
//  阻塞式读取
	let data = fs.readFileSync('c.html');
//  输出一个16进制的文本内容
	console.log(data);
//  输出正确的数据
	console.log(data.toString());
}());

(function () {
//  非阻塞读取
	console.log('非阻塞读取');
	fs.readFile('c.html', function (err, response) {
		if (err) {
			return console.log('读取失败');
		}
		console.log(response);
		console.log(response.toString());
	});
}());