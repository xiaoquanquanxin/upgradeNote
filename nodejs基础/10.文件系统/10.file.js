const fs = require('fs');

const filePath = 'readFile.txt';
//  同步读取和异步读取
(function () {
	return;
	// 异步读取
	fs.readFile(filePath, function (err, data) {
		if (err) {
			return console.error(err);
		}
		console.log('异步*****************************异步');
		console.log(data.toString());
	});

// 同步读取
	const data = fs.readFileSync(filePath);

	console.log('同步*****************************同步');
	console.log(data.toString());

	console.log("程序执行完毕。");
}());

//  读写
(function () {
	console.log("准备打开文件！");
	const buf = new Buffer.alloc(32);
	fs.open(filePath, 'r+', function (err, fd) {
		if (err) {
			return console.error(err);
		}
		console.log("文件打开成功！");

		fs.read(fd, buf, 0, buf.length, 0, function (err, bytes) {
			if (err) {
				console.log(err);
			}
			console.log(bytes + "  字节被读取");

			// 仅输出读取的字节
			if (bytes > 0) {
				console.log(buf.slice(0, bytes).toString());
			}
			fs.close(fd, function () {

			})
		});
	});
}());
