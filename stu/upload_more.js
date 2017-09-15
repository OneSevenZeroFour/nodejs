/*

多文件文件上传
 */
var express = require("express");
var multer = require("multer");


//配置文件存放信息

var storage = multer.diskStorage({
	//设置存放目录
	destination:function(request,file,cb){
		cb(null,"./loading")
	},
	//设置文件名
	filename:function(request,file,cb){
		//截取原始文件的后缀
		var format = file.originalname.split(".");
		cb(null,file.fieldname + "-" + Date.now() + "." + format[format.length-1])
	}
})
//配置存放文件信息 这里的参数还可以限制文件数 文件大小!!!!
var uploader = multer({
	storage:storage
})

//(配置http服务) 初始化express应用
var app = express();
app.use(express.static('../src'));
//多文件上传
app.post("/file",uploader.any(),function(request,response,next){
	response.setHeader("Access-Control-Allow-Origin","*");//设置请求头访问类型，解决跨域
	console.log(request.file,request.body);
	response.send("ok")
})
app.listen(10044);
console.log("server is start")








