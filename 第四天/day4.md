# express

[express中文文档](http://www.expressjs.com.cn/)

[npm express英文文档](https://www.npmjs.com/package/express)

获取url上的信息然后交给前端或者后端进行处理

路由:解析url->完成逻辑

比如有一段url
```js
https://www.npmjs.com/package/express?asdasd=asdsad#jjjj
处理这段url，我们可以获取里面的路由信息

https

www.npmjs.com

?asdasd=asdsad

#jjjj

```
1. `npm install express --save`安装express第三方模块
2. 实例化`var app = express()`
3. 配置路由`app.all()/app.get()/app.post()`


# GET

使用`req.query`来接受来自于前端的GET请求参数
```js
var express = require("express");
//初始化第一个express应用程序
var app = express();
//获取前端发送的get请求，并响应结果
app.get("/select", function(req, res) {
	//获取get请求的参数 url querystring
	console.log(req.query)
	res.send('Hello World')
})
//监听端口，并打开服务器
app.listen(12345);
console.log("开启服务器")
```

# POST

必须使用body-parser处理post请求的参数

[body-parser](https://www.npmjs.com/package/body-parser)
[req.body](http://www.expressjs.com.cn/4x/api.html#req.body)
```js
var express = require("express");
//引入body-parser处理post请求
var bodyParser = require('body-parser')
//初始化第一个express应用程序
var app = express();

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({
	extended: true
})); // for parsing application/x-www-form-urlencoded

//获取前端发送的get请求，并响应结果
app.post("/all", function(req, res) {
	//获取post请求的参数 监听req的流
	console.log(req.body);
	res.send('post post')
})
//监听端口，并打开服务器
app.listen(12345);
console.log("开启服务器")
```

|GET|POST|JSONP|
|-|-|-|
|`req.query`|`req.body`|`req.query`|