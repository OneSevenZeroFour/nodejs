var http = require("http");//非相对路径
//console.log(http)
//创建服务器，在这里一直监听12345端口，并且处理相应和请求
http.createServer((res,req)=>{
	//req.setHeader("Access-Control-Allow-Origin:*");
	req.setHeader("Access-Control-Allow-Origin","*");
	//res请求
	//req响应
	
	var arr = ["a","b","c"];
	var obj = {
		name:"laoyao",
		arr
	}
	
	req.end(JSON.stringify(obj))
}).listen(12345)
