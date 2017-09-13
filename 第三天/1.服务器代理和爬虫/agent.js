var http = require("http");
//console.log(http);
//http.get(url,callback)
http.get("http://www.mmjpg.com/",function(res){
	var data = "";
	res.setEncoding('utf8');
	res.on("data",function(chunk){
		data+=chunk
	})
	res.on("end",function(){
		console.log(data)
	})
})
