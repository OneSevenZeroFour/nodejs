var http = require("http");
var fs = require("fs");
//类似于 jQ
const cheerio = require("cheerio");
const queryStr = require("querystring");

var postData = queryStr.stringify({
	"msg":"Hello!"
})
//发送http的 request 请求
var request = http.request({
	hostname:"www.ivsky.com",
	port:80,
	method:"POST",
	headers:{
		'Content-Type': 'application/x-www-form-urlencoded',
	    'Content-Length': postData.length		
	}
},function(response){
	var datas = "";
	var imgs = [];
	
	response.on("data",function(chunk){
		datas+=chunk;
	})

	response.on("end",function(){
		const $ = cheerio.load(datas);
console.log($)
		$("img").each(function(idx,dom){
			imgs.push($(dom).attr("src"))
		})
			// console.log(imgs)
			// 遍历创建对应的 可写流
		for(let i=0;i<imgs.length;i++){
			var imgStream = fs.createWriteStream(`./img/vks${i}.jpg`);
			download(imgs,i,imgStream)
		}	
	})

})
request.on("error",function(err){
	console.log('problem with request: ' + err.message)
})
request.write(postData)
request.end();

function download(imgs,i,imgStream){
	http.get(imgs[i],function(res){
		res.pipe(imgStream);
		console.log(res)
	})	
}

// console.log(postData);
//注意加end方法 结束请求
//req.end()必须被调用，即使没有在请求体内写入任何数据
//也必须调用。因为这表示已经完成HTTP请求
















