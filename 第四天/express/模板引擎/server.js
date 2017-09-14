var express = require("express");
//初始化第一个express应用程序
var app = express();
app.use(express.static('public'));
//设置模板引擎
app.set('view engine', 'jade');
//获取前端发送的get请求，并响应结果
app.get("/select", function(req, res) {
	//获取get请求的参数 url querystring
	console.log(req.query)
	var data = ["a","b","c"];
	res.send(`
	<!DOCTYPE html>
	<html>
		<head>
			<meta charset="UTF-8">
			<title></title>
		</head>
	
		<body>
			<ul>
				<li>${data[0]}</li>
				<li>${data[1]}</li>
				<li>${data[2]}</li>
			</ul>
			<script src="js/jquery.js"></script>
			<script>
				$.ajax({
					type: "GET",
					data: {
						name: "laoyao"
					},
					url: "http://localhost:81/1704/nodejs/template.php",
					success: function(data) {
						console.log(data)
					}
				})
			</script>
		</body>
	</html>	
	`)
})
//监听端口，并打开服务器
app.listen(12345);
console.log("开启服务器")
//vue