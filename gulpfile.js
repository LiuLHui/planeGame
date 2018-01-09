


var gulp = require("gulp");
var uglify = require("gulp-uglify"); //js压缩插件
var babel = require("gulp-babel");
var minifyCss = require("gulp-minify-css");
var rename = require("gulp-rename");

//压缩js
gulp.task("jsTask",function(){
    gulp.src("js/src/*.js")
    .pipe(babel({"presets": ["es2015"]})) //es6转es5
    .pipe(uglify())
    .pipe( gulp.dest("js/dest"))
})

//压缩css
gulp.task('cssTask', function(){
	gulp.src('css/dafeiji.css')
    .pipe(minifyCss())
    .pipe( rename("dafeiji.min.css") ) //使用插件rename
	.pipe(gulp.dest('css'));
});




gulp.task("default", ["jsTask","cssTask"]);