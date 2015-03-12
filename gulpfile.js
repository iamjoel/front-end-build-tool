var gulp = require('gulp');
var clean = require('gulp-clean');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');

// 清空目标文件夹的内容
gulp.task('remove', function() {
    return gulp.src('dist/**/*', {
            read: false
        })
        .pipe(clean());
});

// 压缩
gulp.task('js-min', function() {
    return gulp.src('asserts/**/*.js')
        .pipe(uglify()) // 压缩
        .pipe(rename({ // 压缩后的文件加后缀
            suffix: ".min"
        }))
        .pipe(gulp.dest('dist'));// 移动到目标文件。若目标文件夹不存在，会自动创建
});

// https://cnodejs.org/topic/53427d16dc556e3b3901861e
// live load

gulp.task('build', ['remove', 'js-min']);
