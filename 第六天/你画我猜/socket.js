var ioFunc = require("socket.io");
var http = require("http");
//创建一个服务器
var server = require('http').createServer();
var io = ioFunc(server);
io.on('connection', function(socket) {
	socket.on('draw', function(data) {
		console.log(data);
		//io全部人接受 群聊
		//socket自己发自己收
		io.emit("paint",data)
	});
	//socket.on('disconnect', function() {});
});
server.listen(3000);