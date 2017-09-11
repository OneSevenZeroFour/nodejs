//cnpm install gulp -g
//第三方模块
var gulp = require("gulp");
var uglify = require("gulp-uglify");
gulp.task("minifyjs", function() {
	//导入JS文件
	return gulp.src("./test.js")
		//执行压缩
		.pipe(uglify())
		//导出JS文件
		.pipe(gulp.dest("./dist"))
});

gulp.task("default", ["minifyjs"])
//npm install