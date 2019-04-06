//  引入Event模块并创建eventEmitter对象
let events = require('events');
let eventEmitter = new events.EventEmitter();
//  绑定事件处理函数
let connectHanlder = function connected() {
	console.log('事件处理函数');
};
//  事件名称，回调函数
eventEmitter.on('connection', connectHanlder);

//  触发事件
eventEmitter.emit('connection');
//  输出提示
console.log('程序执行完毕');
//  再次触发
eventEmitter.emit('connection');

