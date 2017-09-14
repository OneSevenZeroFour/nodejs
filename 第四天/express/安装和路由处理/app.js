var express = require("express");
//初始化第一个express应用程序
var app = express();
//获取前端发送的get请求，并响应结果
app.get("/select", function(req, res) {
	//获取get请求的参数
	res.send('Hello World')
})

app.post("/", function(req, res) {
	res.append("Access-Control-Allow-Origin", "*")
	res.send('你现在发送的是post请求')
})

app.get("/", function(req, res) {
	res.append("Access-Control-Allow-Origin", "*")
	res.send("<p style='color:red'>h w</p>")
})

app.all("/all", function(req, res) {
	res.append("Access-Control-Allow-Origin", "*")
	res.send("允许任何请求")
})
//监听端口，并打开服务器
app.listen(12345);
console.log("开启服务器")