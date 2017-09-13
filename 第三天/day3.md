# http服务器代理

## 爬取网页数据
1. 使用`http.get`请求获取数据，默认使用http协议和get方法获取
```js
http.get(url,callback)
```


2. 使用`http.request`请求数据

[http官方文档](http://nodejs.cn/api/http.html#http_http_get_options_callback)
```js
http.request(options,callback)
```

## cheerio分析数据

在npm包管理中心下载[cheerio模块](https://www.npmjs.com/package/cheerio)

cheerio继承的是jquery语法
```js
var cheerio = require('cheerio');
const $ = cheerio.load(data)
$("img").each(function(index,ele){
	console.log($(ele).attr("src"))
})
```

# mysql

在npm包管理中心下载[mysql模块](https://www.npmjs.com/package/mysql)
```js
//引入mysql的第三方模块
var mysql = require('mysql');
//配置连接的参数
var connection = mysql.createConnection({
	host: 'localhost',
	user: 'yaoyiyao',
	password: '123456789',
	database: 'lagou'
});
//执行连接
connection.connect();

connection.query('SELECT * FROM jobs', function(error, results, fields) {
	if(error) throw error;
	console.log('The solution is: ', results);
});

connection.end();
```

# node前后端通信

前端->后端->前端

> index.html--ajax(get)-->server.js--(config,connect,query)-->mysql--callback(results)-->server.js--req.end(results)-->index.html

# nodejs+mysql增删查改