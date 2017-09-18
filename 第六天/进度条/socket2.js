var ioFunc = require("socket.io");

var http = require("http");
//创建一个服务器
var server = require('http').createServer();
var io = ioFunc(server);
server.listen(3000);
var i = 0
io.on('connection', function(socket) {
	setInterval(function(){
		//io.emit("getMessage", i)
		i++;
	},2000)
});