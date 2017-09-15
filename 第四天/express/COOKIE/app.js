var express = require("express");

var cookieParser = require('cookie-parser')
//初始化第一个express应用程序
var app = express();
app.use(cookieParser())
app.use(express.static('public'));
//获取前端发送的get请求，并响应结果
app.get("/cookie", function(req, res) {
	//获取get请求的参数 url querystring
	console.log(req.cookies)
	res.send('Hello World')
})
//监听端口，并打开服务器
app.listen(12345);
console.log("开启服务器")