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
常用的内置模块
```js
http,fs,os,querystring,url...
```

## 自定义模块

```js
var http = require("../http.js");//非相对路径
```

## 第三方模块