var express = require("express");
//初始化第一个express应用程序
var app = express();
app.use(express.static('public'));
//设置放模板的地方
app.set('views', './views')
//设置模板引擎的语言 ejs jade
app.set('view engine', 'jade');
//获取前端发送的get请求，并响应结果
app.get("/select", function(req, res) {
	//获取get请求的参数 url querystring
	res.render('laoyao', {
		title: 'Hey',
		message: 'Hello there!'
	});
})
//监听端口，并打开服务器
app.listen(12345);
console.log("开启服务器");