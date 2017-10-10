var gulp  = require('gulp'),
concat    = require('gulp-concat'),
uglify    = require('gulp-uglify'),
uglifycss = require('gulp-uglifycss'),
gulpSass  = require('gulp-sass')


gulp.task('default', function () {
	gulp
	.src('./assets/sass/*.scss') // 指定要處理的 Scss 檔案目錄
	.pipe(gulpSass({ // 編譯 Scss
		outputStyle: 'compressed'
	}))
	.pipe(gulp.dest('./assets/css/v2')); // 指定編譯後的 css 檔案目錄	
})


gulp
.task('watch', function () {
    gulp.watch('./assets/sass/*.scss', ['default']);
});
