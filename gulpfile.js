var gulp = require('gulp');
var clean = require('gulp-clean');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
// 用livereload 要装Chrome插件
// https://chrome.google.com/webstore/detail/livereload/jnihajbhpnppcggbcgedagnkighmdlei
var livereload = require('gulp-livereload');

var SRC_PATH = 'src';
var DIST_PATH = 'build';

// 清空目标文件夹的内容
gulp.task('remove', function() {
    return gulp.src(DIST_PATH + '/**/*', {
            read: false
        })
        .pipe(clean());
});

// 压缩
gulp.task('js-min', function() {
    return gulp.src(SRC_PATH + '/**/*.js')
        .pipe(uglify()) // 压缩
        .pipe(rename({ // 压缩后的文件加后缀
            suffix: ".min"
        }))
        .pipe(gulp.dest(DIST_PATH)); // 移动到目标文件。若目标文件夹不存在，会自动创建
});

// liveload 页面的css，js，html发生改变时，主动的刷新页面
gulp.task('watch', function() {
    livereload.listen();
    gulp.watch(SRC_PATH + '/**/*', function (path) {
        // console.info('flie changed');
        livereload.changed(path);// 通知浏览器刷新页面
    });
});

gulp.task('build', ['remove', 'js-min']);
gulp.task('w', ['watch']);
