var express = require("express");
//引入body-parser处理post请求
var bodyParser = require('body-parser')
//初始化第一个express应用程序
var app = express();
var mysql = require('mysql');
//配置连接的参数
var connection = mysql.createConnection({
	host: 'localhost',
	user: 'yaoyiyao',
	password: '123456789',
	database: 'lagou'
});
//执行连接
connection.connect();
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({
	extended: true
})); // for parsing application/x-www-form-urlencoded

//获取前端发送的get请求，并响应结果
app.post("/getjobs", function(req, res) {
	//用fs读写文件，实现爬虫，实现读写数据库，api接口等
	//获取post请求的参数 监听req的流
	console.log(req.body);
	connection.query('SELECT * FROM jobs limit 0,5', function(error, results, fields) {
		res.append("Access-Control-Allow-Origin","*")
		if(error) throw error;
		console.log('The solution is: ', results);
		res.send(JSON.stringify({
			results
		}));
	});
})
//监听端口，并打开服务器
app.listen(12345);
console.log("开启服务器")