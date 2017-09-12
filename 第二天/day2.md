# event

要用事件驱动必须引入内置的events模块，并且要实例化`new events.EventEmitter()`
```js
//引入一个内置的event模块
var events = require("events");
//创建eventEmitter
var eventEmitter = new events.EventEmitter();
```

内置的event模块

1. **on**是事件绑定 

2. **emit**事件触发
```js
eventEmitter.on("事件名",事件回调)；
eventEmitter.emit('事件名');
```

# buffer

把buffer流数据转为字符串数据
```js
buffer.toString()
```

# stream

## 读
内置的stream模块，相比**fs.readFile**在处理大型文件的时候更有优势

因为它接受数据是以流的形式逐步接受，它经历三个阶段data,end,error
```js
var fs = require("fs");
//创建可读流
var readerStream = fs.createReadStream("input.txt");
//容器开始是空的
var data = "";
//监听流数据

//data, end, and error
readerStream.on("data", function(chunk) {
	//不断往容器里面添加数据
	data += chunk
})
readerStream.on("end", function() {
	console.log("数据接受完成")
	console.log(data)
})
readerStream.on("error", function() {
	console.log("数据接受错误")
})
```

## 写

```js
var fs = require("fs");
var writerStream = fs.createWriteStream("input.txt");
var data = "你好你好";
writerStream.write(data, 'UTF8');
writerStream.end();
writerStream.on('finish', function() {
	console.log("写入完成。");
});
writerStream.on('error', function(err) {
	console.log(err.stack);
});
console.log("程序执行完毕");
```
## pipe

用于复制文件，上传下载等

## zlib

用于压缩
```js
var fs = require("fs");
var readerStream = fs.createReadStream('./invideo/1.jpg');
var writerStream = fs.createWriteStream('./outvideo/2.jpg.gz');
readerStream.pipe(writerStream);
```
```js
var zlib = require('zlib');
readerStream.pipe(zlib.createGzip()).pipe(writerStream);
```