var http = require("http");
var querystring = require("querystring");
//解析url的专用模块
//request是一个stream流
http.createServer((request, response) => {
	var data;
	request.on('data', function(chunk) {
		data += chunk;
	});

	request.on('end', function() {
		console.log(data);
		querystring.parse(data)
		console.log(querystring.parse(data))
		
	});
}).listen(12345)