//file system文件系统
var fs = require("fs");
console.log("1");
//异步 非阻塞
var text;

function a(callback) {
	fs.readFile("./input.txt", function(err, data) {
		console.log("2");
		text = data.toString()
		console.log(data.toString())
		callback(text)
	})
}
a(function(text){
	console.log(text)
})

//同步 阻塞
/*var data = fs.readFileSync("./input.txt");
console.log("2");
console.log(data.toString())
console.log("3");*/