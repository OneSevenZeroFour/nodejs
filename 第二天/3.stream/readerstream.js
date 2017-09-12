/*var http = require("http");//非相对路径
http.createServer((request,response)=>{
	//request就是一个stream流
}).listen(12345)*/

var fs = require("fs");
//创建可读流
var readerStream = fs.createReadStream("input.txt");
//容器开始是空的
var data = "";
//监听流数据

//data, end, and error
readerStream.on("data", function(chunk) {
	//不断往容器里面添加数据
	data += chunk
})
readerStream.on("end", function() {
	console.log("数据接受完成")
	console.log(data)
})
readerStream.on("error", function() {
	console.log("数据接受错误")
})