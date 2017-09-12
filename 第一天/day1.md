# Nodejs

```js
console.log("hello world")
```
1. 如果在前端是浏览器下运行，那宿主环境就是浏览器，并且运行的时候要在html引入
2. 但是如果在后端nodejs环境下运行，那宿主环境就是nodejs,并且不需要在html引入

> 你可以理解为就是一个没有显示网页界面的谷歌浏览器(因为本质上nodejs就是抽离了谷歌V8引擎，也就是谷歌浏览器的控制台的一个运行环境)


> 注意:注意不要用DOM和BOM的方法来去执行nodejs，因为nodejs是一个没有界面的浏览器环境

如果要去执行nodejs的文件,定位到对应的文件夹，然后打开命令行，输入以下代码执行，也可以省略后缀
```js
node xxxx.js/ node xxxx
```
一般我们使用脚本模式

# 下载
[Node.js中文网](http://nodejs.cn/)

# 模块

用require方法，require自定义模块的时候，要用相对路径
```js
//导入模块
var add = require("./module1.js");
```

导出模块，使用module.exports
```js
//导出模块
var obj = {
	name: "layoyao",
	age: 99,
	skill: ["PS", "JS", "CSS"]
}
module.exports = obj;
```

## 内置模块

不需要相对路径
```js
var http = require("http");//非相对路径
```

http模块,主要是用来创建服务器
```js
http.createServer(callback)
```

常用的内置模块
```js
http,fs,os,querystring,url...
```

## 自定义模块

```js
var http = require("../http.js");//非相对路径
```

## 第三方模块

比如**gulp,jquery**都是第三方模块

首先先找node_modules有没有，找全局，找缓存
```js
var gulp = require("gulp");//非相对路径
var gulp = require("./node_modules/gulp");//相对路径
```

## NPM

NPM是第三方模块的“应用商店”,所有的模块都可以在NPM包管理中心下载
```js
npm install xxxx
```

比如gulp

第三方模块就是在[npm包管理中心](https://www.npmjs.com)下载回来的模块

# 回调函数

回调让异步变得有意义，异步和回调是相互并存的，不代表有回调就是异步，

nodejs所有的异步函数都支持回调
```js
console.log("1")
function a(callback) {
	setTimeout(function(){
		console.log("2")
		callback()
	})
}

a(function() {
	//不阻塞这个线程
	console.log("3")
});
```
所以nodejs的异步函数都包含着回调
```js
//同步阻塞 没有回调函数
fs.readFileSync("./input.txt")
//异步非阻塞 有回调函数
fs.readFile("./input.txt", function(err, data) {})
```

# http内置模块

1. 引入http内置模块
2. 用http的**createServer**方法去创建服务器,传入回调函数
3. 回调函数里面接受两个值(形参)res,req(response,request)，res是处理相应的，req处理请求的
4. 用listen监听一个端口[0~65535]
```js
var http = require("http");//非相对路径
//创建服务器，在这里一直监听12345端口，并且处理相应和请求
http.createServer((res,req)=>{
	req.setHeader("Access-Control-Allow-Origin","*");
	//res请求
	//req响应
	//相应结果到浏览器或者前端
	req.writeHead(200, {'Content-Type': 'text/html'});
	req.end("<p style='color:red'>123</p>")
}).listen(12345)
```
用这个来代替php

