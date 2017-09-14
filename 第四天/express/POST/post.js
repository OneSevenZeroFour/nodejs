var express = require("express");
//引入body-parser处理post请求
var bodyParser = require('body-parser')
//初始化第一个express应用程序
var app = express();

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({
	extended: true
})); // for parsing application/x-www-form-urlencoded

//获取前端发送的get请求，并响应结果
app.post("/all", function(req, res) {
	//获取post请求的参数 监听req的流
	console.log(req.body);
	res.send('post post')
})
//监听端口，并打开服务器
app.listen(12345);
console.log("开启服务器")