var gulp = require('gulp');
var clean = require('gulp-clean');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
// 用livereload 要装Chrome插件
// https://chrome.google.com/webstore/detail/livereload/jnihajbhpnppcggbcgedagnkighmdlei
var livereload = require('gulp-livereload');
var header = require('gulp-header');
var jshint = require('gulp-jshint');

var pkg = require('./package.json');

var banner = [
    '/**',
    ' ** <%= pkg.name %> - <%= pkg.description %>',
    ' ** @author <%= pkg.author %>',
    ' ** @version v<%= pkg.version %>',
    ' **/',
    ''
].join('\n');

var SRC_PATH = 'src';
var DIST_PATH = 'build';

// 清空js
gulp.task('clean-js', function() {
    // console.info('js cleaned');
    return gulp.src(DIST_PATH + '/**/*.js', {
            read: false
        })
        .pipe(clean());
});

// 压缩js
gulp.task('min-js', ['clean-js'],function() {
    return gulp.src(SRC_PATH + '/**/*.js')
        .pipe(jshint('.jshintrc'))// 代码检查 https://github.com/jshint/jshint/blob/master/examples/.jshintrc
        .pipe(jshint.reporter('jshint-stylish'))
        .pipe(uglify()) // 压缩
        .pipe(header(banner, {pkg: pkg}))// 加文件描述
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

gulp.task('default',['watch']);
gulp.task('w', ['watch']);

gulp.task('build', ['min-js']);
