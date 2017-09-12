var http = require("http");
//解析url的专用模块
var url = require("url");
//
var querystring = require("querystring");

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
	req.end("aaaaa")
}).listen(12345)