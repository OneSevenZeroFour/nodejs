var http = require("http");
var fs = require("fs");
//导入cheerio第三方模块
var cheerio = require('cheerio');
//console.log(http);
//http.request(options[, callback])
http.request({
	hostname: "www.mmjpg.com",
	port: 80,
	//path:"/",
	method: "GET"
}, function(res) {
	var data = "";
	//res.setEncoding('utf8');
	res.on("data", function(chunk) {
		data += chunk
	})
	res.on("end", function() {
		//console.log(data);
		const $ = cheerio.load(data);

		var imgArr = [];

		$("img").each(function(index, ele) {
			//console.log($(ele).attr("src"));
			imgArr.push($(ele).attr("src"))
		})
		download(imgArr)
	})
}).end();

function download(imgArr) {
	console.log(imgArr)
	var writerStream = fs.createWriteStream('./img/3.jpg');
	http.get(imgArr[3], function(res) {
		res.pipe(writerStream)
	})
}