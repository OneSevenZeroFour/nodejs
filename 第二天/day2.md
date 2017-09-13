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

# 路由

## GET
获取url上的id信息
```
https://item.taobao.com/item.htm?spm=a1z10.5-c-s.w4002-4609134294.17.41f58d4cGMvdOy&id=551064658726
```
后端获取前端GET请求的数据

|php|nodejs|
|-|-|
|`$_GET[xxx]`|`var query = url.parse(res.url).query;var data = querystring.parse(query)`|
```
http://localhost:12345/?name=laoyao
```

要获取`name=laoyao`这个键值对
1. 必须使用引入url的内置模块 ,切割url的有效片段**(indexOf("?")/search -> substr(x) -> split("=") )**
2. 必须使用引入querystring的内置模块,把url有效片段的字符串数据转为对象


## POST

```js
var http = require("http");
var querystring = require("querystring");
//解析url的专用模块
//request是一个stream流
http.createServer((request, response) => {
	var data = "";
	request.on('data', function(chunk) {
		data += chunk;
	});

	request.on('end', function() {
		console.log(data);
		querystring.parse(data)
		console.log(querystring.parse(data))
		
	});
}).listen(12345)
```

## JSONP

```js
var http = require("http");
//解析url的专用模块
var url = require("url");
//
var querystring = require("querystring");

http.createServer((res, req) => {
	//url
	console.log(res.url)
	//url获取?后面的参数
	console.log(url.parse(res.url).query)
	var query = url.parse(res.url).query;
	//
	var data = querystring.parse(query);
	console.log(data.callback)
	var callback = data.callback;
	var obj = {
		name: "laoyao",
		age: 99,
		skill: ["ps","js","css"]
	}
	
	req.end(callback+"("+JSON.stringify(obj)+")")
}).listen(12345)
```