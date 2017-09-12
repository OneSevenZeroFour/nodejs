var fs = require("fs");
//压缩模块
var zlib = require('zlib');
// 创建一个可读流
//var readerStream = fs.createReadStream('./invideo/abc.wmv');
var readerStream = fs.createReadStream('./invideo/1.jpg');
// 创建一个可写流
//var writerStream = fs.createWriteStream('./outvideo/cba.wmv');
var writerStream = fs.createWriteStream('./outvideo/2.jpg.gz');
// 管道读写操作
// 读取 input.txt 文件内容，并将内容写入到 output.txt 文件中
readerStream.pipe(zlib.createGzip()).pipe(writerStream);
console.log("程序执行完毕");