var http = require("http");
//解析url的专用模块
var url = require("url");
//
var querystring = require("querystring");
//引入mysql
var mysql = require("mysql");
//配置连接的参数
var connection = mysql.createConnection({
	host: 'localhost',
	user: 'yaoyiyao',
	password: '123456789',
	database: 'lagou'
});
//执行连接
connection.connect();
http.createServer((res, req) => {
	//url
	console.log(res.url)
	//url获取?后面的参数
	console.log(url.parse(res.url).query)
	var query = url.parse(res.url).query;
	//
	var data = querystring.parse(query);
	console.log(data.name)

	req.setHeader("Access-Control-Allow-Origin", "*");
	req.writeHead(200, {
		'Content-Type': 'text/html'
	});
	//获取mysql的数据
	connection.query('SELECT * FROM jobs', function(error, results, fields) {
		if(error) throw error;
		console.log('The solution is: ', results);
		var obj = {
			name:"这是你要的拉勾网数据",
			results
		}
		//响应数据到前端
		req.end(JSON.stringify(obj))
	});
}).listen(12345)