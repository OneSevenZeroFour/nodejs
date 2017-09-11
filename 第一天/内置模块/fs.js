const fs = require('fs');
//console.log(fs)
/*fs.mkdir('./test1', function(){
	console.log("创建文件夹成功")
})*/
fs.readFile("./input.txt",(err,data)=>{
	console.log(data.toString());
})
