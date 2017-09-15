var http = require("http");
var express = require("express");
var bodyParser = require('body-parser')
var fs = require("fs")

var app = express();
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({
	extended: true
}));

//获取前端发送的get请求，并响应结果
app.post("/api", function(req, res) {
	//获取get请求的参数 url querystring
	console.log(req.body)
	res.send('Hello World')

	//服务器代理 爬虫 （读写文件，上传下载文件，爬虫，写日志或者测试数据库，敏感字符处理）
	/*http.get("http://localhost:81/1704/nodejs/api.php?name=" + req.query.name, function(res) {
		var data = "";
		res.setEncoding('utf8');
		res.on("data", function(chunk) {
			data += chunk
		})
		res.on("end", function() {
			console.log(data)
		})
	})*/

	http.request({
		hostname: "http://localhost:81/1704/nodejs/api.php",
		port: 81,
		//path:"/",
		method: "POST"
	}, function(res) {
		var data = "";
		//res.setEncoding('utf8');
		res.on("data", function(chunk) {
			data += chunk
		})
		res.on("end", function() {
		})
	}).end();

})
//监听端口，并打开服务器
app.listen(12345);
console.log("开启服务器")