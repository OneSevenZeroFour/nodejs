var express = require("express");
var multer = require("multer")
//配置上传文件存放的信息
var storage = multer.diskStorage({
	//设置上传文件存放的目录
	destination: function(req, file, cb) {
		cb(null, './uploads')
	},
	//设置上传后文件的名字
	filename: function(req, file, cb) {
		//拼接文件名和文件后缀
		var fileFormat = file.originalname.split(".");
		cb(null, file.fieldname + '-' + Date.now() + "." + fileFormat[fileFormat.length - 1])
	}
})
//往multer去配置这个存放文件的信息
var upload = multer({
	storage: storage
})

//初始化第一个express应用程序
var app = express();
//获取前端发送的get请求，并响应结果
app.get("/select", function(req, res) {
	res.send("hello")
})

//单文件上传
app.post('/profile', upload.any(), function(req, res, next) {
	// req.file is the `avatar` file 
	// req.body will hold the text fields, if there were any 
})

//监听端口，并打开服务器
app.listen(12345);
console.log("开启服务器")