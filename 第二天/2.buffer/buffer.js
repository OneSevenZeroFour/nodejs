var fs = require("fs");

var http = require("http");
http.createServer((res, req) => {
	req.setHeader("Access-Control-Allow-Origin", "*");
	req.writeHead(200, {
		'Content-Type': 'text/html'
	});
	var text;
	function rf(callback) {
		fs.readFile("./index.html", function(err, data) {
			//把buffer流数据转为字符串
			text = data.toString();
			callback(text)
		})
	}
	rf(function(text){
		console.log(text)
		req.end(text);
	})
}).listen(12345)