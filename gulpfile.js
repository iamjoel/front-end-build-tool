// todo https://github.com/jonkemp/gulp-useref http://imziv.com/blog/article/read.htm?id=60
var gulp = require('gulp');
var clean = require('gulp-clean');
var uglify = require('gulp-uglify');
var minifyCss = require('gulp-minify-css');
var rename = require('gulp-rename');

var header = require('gulp-header');
var jshint = require('gulp-jshint');
var stripDebug = require('gulp-strip-debug'); // 该插件用来去掉console和debugger语句

var pkg = require('./package.json');

var banner = [
    '/**',
    //  ' ** <%= pkg.name %> - <%= pkg.description %>',
    ' ** @author <%= pkg.author %>',
    ' ** @version v<%= pkg.version %>',
    ' **/',
    ''
].join('\n');


var SRC_PATH = 'src/';
var DIST_PATH = 'build';

var paths = {
    js: [ // js目录
        SRC_PATH + '/**/*.js'
    ],
    css: [
        SRC_PATH + '/**/*.css'
    ],
    image: [
        SRC_PATH + '/**/*.png',
        SRC_PATH + '/**/*.jpeg',
        SRC_PATH + '/**/*.jpg',
        SRC_PATH + '/**/*.gif'
    ],
    html: [
            SRC_PATH + '/**/*.html'
        ]
        // lib: { // 第三方依赖文件
        //     js: [
        //         'bower_components/bootstrap/dist/js/bootstrap.js',
        //         'bower_components/jquery/jquery.js'
        //     ],
        //     css: [
        //         'bower_components/bootstrap/dist/css/bootstrap.css'
        //     ],
        //     img: [
        //         'bower_components/bootstrap/dist/images/*'
        //     ]
        // }
};

gulp.task('build', ['min-js', 'min-css', 'move-html', 'move-image']);

gulp.task('clean', function() {
    // console.info('js cleaned');
    return gulp.src(DIST_PATH, {
            read: false
        })
        .pipe(clean());
});


// 压缩js
gulp.task('min-js', ['clean-js'], function() {
    return gulp.src(paths.js)
        .pipe(jshint('.jshintrc')) // 代码检查 https://github.com/jshint/jshint/blob/master/examples/.jshintrc
        .pipe(jshint.reporter('jshint-stylish'))
        .pipe(stripDebug())
        .pipe(uglify()) // 压缩
        // .pipe(header(banner, {
        //     pkg: pkg
        // })) // 在文件头部加文件描述
        // .pipe(rename({ // 压缩后的文件加后缀
        //     suffix: ".min"
        // }))
        .pipe(gulp.dest(DIST_PATH)); // 移动到目标文件。若目标文件夹不存在，会自动创建
});

// 压缩css
gulp.task('min-css', ['clean-css'], function() {
    return gulp.src(paths.css)
        .pipe(minifyCss()) // 压缩
        .pipe(gulp.dest(DIST_PATH)); // 移动到目标文件。若目标文件夹不存在，会自动创建
});

// 移动HTML
gulp.task('move-html', ['clean-html'], function() {
    return gulp.src(paths.html)
        .pipe(gulp.dest(DIST_PATH));
});

// 移动HTML
gulp.task('move-image', ['clean-image'], function() {
    return gulp.src(paths.image)
        .pipe(gulp.dest(DIST_PATH));
});

// http://www.browsersync.io/docs/gulp/
var browserSync = require('browser-sync').create();
gulp.task('browser-sync', function() {
    browserSync.init({
        files: "**",
        server: {
            baseDir: "./src/"
        }
    });
});


// var spritesmith = require('gulp.spritesmith');
// gulp.task('sprite', function() {
//     // Generate our spritesheet
//     var spriteData = gulp.src(SRC_PATH + '/asserts/img/**/*.png').pipe(spritesmith({
//         imgName: 'sprite.png',
//         cssName: 'sprite.css',
//         padding: 100
//     }));

//     spriteData.img
//         // .pipe(imagemin())
//         .pipe(gulp.dest(DIST_PATH + '/asserts/img'));

//     spriteData.css
//         // .pipe(csso())
//         .pipe(gulp.dest(DIST_PATH + '/asserts/css'));

// });

// 清空js
gulp.task('clean-js', function() {
    return gulp.src(DIST_PATH + '/**/*.js', {
            read: false
        })
        .pipe(clean());
});

gulp.task('clean-css', function() {
    return gulp.src(DIST_PATH + '/**/*.css', {
            read: false
        })
        .pipe(clean());
});

gulp.task('clean-html', function() {
    return gulp.src(DIST_PATH + '/**/*.html', {
            read: false
        })
        .pipe(clean());
});

gulp.task('clean-image', function() {
    return gulp.src(DIST_PATH + '/**/*.png', {
            read: false
        })
        .pipe(clean());
});

gulp.task('default', ['browser-sync']);