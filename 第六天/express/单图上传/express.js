//引入express框架
var express = require("express");
var app = express();
app.listen(3000);

var multer = require('multer');

var ioFunc = require("socket.io");

var http = require("http");
//创建一个服务器
var server = require('http').createServer();
var io = ioFunc(server);
io.on('connection', function(socket) {
	socket.on('chat', function(data) {
		console.log(data);
		io.emit("getMessage", data)
	});
});
server.listen(12345);

app.use(express.static('uploads'));

var storage = multer.diskStorage({
	//设置上传后文件路径，uploads文件夹会自动创建。
	destination: function(req, file, cb) {
		cb(null, './uploads')
	},
	//给上传文件重命名，获取添加后缀名
	filename: function(req, file, cb) {
		var fileFormat = (file.originalname).split(".");
		//给图片加上时间戳格式防止重名名
		//比如把 abc.jpg图片切割为数组[abc,jpg],然后用数组长度-1来获取后缀名
		cb(null, file.fieldname + '-' + Date.now() + "." + fileFormat[fileFormat.length - 1]);
	}
});
var upload = multer({
	storage: storage
});

//单图上传
app.post('/upload-single', upload.single('logo'), function(req, res, next) {
	res.append("Access-Control-Allow-Origin", "*");
	console.log(req.file)
	console.log('文件类型：%s', req.file.mimetype);
	console.log('原始文件名：%s', req.file.originalname);
	console.log((req.file.originalname).split("."))
	console.log('文件大小：%s', req.file.size);
	console.log('文件保存路径：%s', req.file.path);
	io.emit("getMessage", {
		type:"img",
		filename:req.file.filename
	})
	res.send({
		wscats_code: '0'
	});
});