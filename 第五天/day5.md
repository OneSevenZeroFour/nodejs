# 本地存储和COOKIE

1. COOKIE可以前端和后端都能读取，但是sessionstorage和localstorage只能前端读取
2. COOKIE是比较小，sessionstorage和localstorage空间比较大
3. COOKIE有时效性，sessionstorage和localstorage没有时效性

## sessionstorage，localstorage的区别

sessionstorage页面关闭则消失，localstorage永久存储

1. cookie 登录注册等逻辑
2. localstorage 设置主题背景颜色，语言切换
3. sessionstorage 设置数据缓存

# 服务器代理
```js
var http = require("http");
var express = require("express");
var bodyParser = require('body-parser')
var fs = require("fs")

var app = express();
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({
	extended: true
}));
//获取前端发送的get请求，并响应结果
app.post("/api", function(req, res) {
	//获取get请求的参数 url querystring
	console.log(req.body)
	res.send('Hello World')

	//服务器代理 爬虫 （读写文件，上传下载文件，爬虫，写日志或者测试数据库，敏感字符处理）
	http.request({
		hostname: "http://localhost:81/1704/nodejs/api.php",
		port: 81,
		//path:"/",
		method: "POST"
	}, function(res) {
		var data = "";
		//res.setEncoding('utf8');
		res.on("data", function(chunk) {
			data += chunk
		})
		res.on("end", function() {
		})
	}).end();

})
//监听端口，并打开服务器
app.listen(12345);
console.log("开启服务器")
```

# 百度地图

## HTML5定位
```js
window.navigator.geolocation.getCurrentPosition(function(data){
	//成功的回调
	console.log(data.coords)
	console.log("维度："+data.coords.latitude)
	console.log("经度："+data.coords.longitude)
},function(){
	//错误的回调
})
```

1. [百度地图API](http://lbsyun.baidu.com/index.php?title=jspopular)获取AK
2. 根据[示例DEMO](http://lbsyun.baidu.com/jsdemo.htm?a#a1_2)画地图
