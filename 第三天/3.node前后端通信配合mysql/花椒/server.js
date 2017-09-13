var http = require("http");
//解析url的专用模块
var url = require("url");
var querystring = require("querystring");

http.createServer((res, req) => {
	var query = url.parse(res.url).query;
	var data = querystring.parse(query);
	console.log(data.qu)
	
	http.get("http://www.tuling123.com/openapi/api?key=c75ba576f50ddaa5fd2a87615d144ecf&info="+data.qu,function(res){
		var data = "";
		res.on("data",function(chunk){
			data+=chunk;
		})
		res.on("end",function(){
			console.log(data)
		})
	})

	req.setHeader("Access-Control-Allow-Origin", "*");
	req.writeHead(200, {
		'Content-Type': 'text/html'
	});
	
}).listen(12345)