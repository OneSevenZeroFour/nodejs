var http = require("http");
var querystring = require("querystring");
var url = require("url")

//引入mysql的第三方模块
var mysql = require('mysql');
//配置连接的参数
var connection = mysql.createConnection({
	host: 'localhost',
	user: 'yaoyiyao',
	password: '123456789',
	database: '1704'
});
//执行连接
connection.connect();

//解析url的专用模块
//request是一个stream流
http.createServer(function(request, response) {
	var post = "";
	request.on('data', function(chunk) {
		post += chunk;
	});
	request.on('end', function() {
		var pathname = url.parse(request.url).pathname;
		var posts = querystring.parse(post);
		response.setHeader("Access-Control-Allow-Origin", "*");
		console.log(pathname)
		switch(pathname) {
			case "/select":
				connection.query('SELECT * FROM students', function(error, results, fields) {
					if(error) throw error;
					console.log('The solution is: ', results);
					response.end(JSON.stringify({
						status: 1,
						results
					}))
				});
				break;
			case "/insert":
			console.log(posts)
				connection.query(`insert into students (name,description) values ("${posts.name}","${posts.description}")`, function(error, results, fields) {
					if(error) throw error;
					console.log('The solution is: ', results);
					response.end(JSON.stringify({
						status: 1,
						results
					}))
				});

		}

	});
}).listen(12345)
console.log("启动服务器")