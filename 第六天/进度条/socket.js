var ioFunc = require("socket.io");

var http = require("http");
//创建一个服务器
var server = require('http').createServer();
var io = ioFunc(server);
server.listen(3000);

var http = require("http");
var fs = require("fs");
//类似于 jQ
const cheerio = require("cheerio");
const queryStr = require("querystring");
var postData = queryStr.stringify({
	"msg": "Hello!"
})
//发送http的 request 请求
var request = http.request({
	hostname: "www.ivsky.com",
	port: 80,
	method: "POST",
	headers: {
		'Content-Type': 'application/x-www-form-urlencoded',
		'Content-Length': postData.length
	}
}, function(response) {
	var datas = "";
	var imgs = [];
	response.on("data", function(chunk) {
		datas += chunk;
	})
	response.on("end", function() {
		const $ = cheerio.load(datas);
		$("img").each(function(idx, dom) {
			imgs.push($(dom).attr("src"))
		})
		io.on('connection', function(socket) {
			// 遍历创建对应的 可写流
			for(let i = 0; i < imgs.length; i++) {
				io.emit("getMessage", i)
				var imgStream = fs.createWriteStream(`./img/vks${i}.jpg`);
				download(imgs, i, imgStream)
			}
		});
	})

})
request.on("error", function(err) {
	console.log('problem with request: ' + err.message)
})
request.write(postData)
request.end();

function download(imgs, i, imgStream) {
	http.get(imgs[i], function(res) {
		res.pipe(imgStream);
	})
}