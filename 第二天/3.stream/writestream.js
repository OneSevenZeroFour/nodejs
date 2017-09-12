var fs = require("fs");

var writerStream = fs.createWriteStream("input.txt");
//data, end, and error

var data = "你好你好";

// 使用 utf8 编码写入数据
writerStream.write(data, 'UTF8');
// 标记文件末尾
writerStream.end();

// 处理流事件 --> data, end, and error
writerStream.on('finish', function() {
	console.log("写入完成。");
});

writerStream.on('error', function(err) {
	console.log(err.stack);
});

console.log("程序执行完毕");