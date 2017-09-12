//引入一个内置的event模块
var events = require("events");
//创建eventEmitter
var eventEmitter = new events.EventEmitter();

//回调地狱
/*setTimeout(function() {
	console.log(1)
	setTimeout(function() {
		console.log(2)
		setTimeout(function() {
			console.log(3)
		}, 2000)
	}, 500)
}, 1000)*/

//绑定 connection 事件处理程序
eventEmitter.on('event1', function() {
	setTimeout(function() {
		console.log(1)
	}, 1000)
});
eventEmitter.on('event2', function() {
	setTimeout(function() {
		console.log(2)
	}, 500)
});
eventEmitter.on('event3', function() {
	setTimeout(function() {
		console.log(3)
	}, 2000)
});
// 触发 connection 事件
eventEmitter.emit('event1');
eventEmitter.emit('event2');
eventEmitter.emit('event3');