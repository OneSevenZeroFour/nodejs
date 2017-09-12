var http = require("http");
var querystring = require("querystring");
//解析url的专用模块
//request是一个stream流
http.createServer(function(request, response){
	var post = "";
	request.on('data', function(chunk) {
		post += chunk;
	});

	request.on('end', function() {
		console.log(post);
		querystring.parse(post)
		console.log(querystring.parse(post))
		
	});
}).listen(12345)