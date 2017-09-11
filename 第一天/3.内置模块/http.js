var http = require("http");//非相对路径
var objj = require("./diy.js")
//console.log(http)
//创建服务器，在这里一直监听12345端口，并且处理相应和请求
http.createServer((res,req)=>{
	//req.setHeader("Access-Control-Allow-Origin:*");
	req.setHeader("Access-Control-Allow-Origin","*");
	//res请求
	//req响应
	//相应结果到浏览器或者前端
	//req.end(JSON.stringify(objj))
	req.writeHead(200, {'Content-Type': 'text/html'});
	req.end("<p style='color:red'>123</p>")
}).listen(12345)
//端口小于65536
