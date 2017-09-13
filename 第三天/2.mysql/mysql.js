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

connection.query('SELECT * FROM jobs limit 0,5', function(error, results, fields) {
	if(error) throw error;
	console.log('The solution is: ', results);
});

connection.end();