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
	console.log(data.callback)
	var callback = data.callback;
	var obj = {
		name: "laoyao",
		age: 99,
		skill: ["ps","js","css"]
	}
	
	req.end(callback+"("+JSON.stringify(obj)+")")
}).listen(12345)