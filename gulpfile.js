var gulp = require('gulp'),
	concat = require('gulp-concat'),
	jshint = require('gulp-jshint'),
	minifycss = require('gulp-minify-css'),
	rename = require('gulp-rename'),
	uglify = require('gulp-uglify');

var cssfiles = 'css/*.css',
	jsfiles = 'js/*.js';

gulp.task('css', function() {
	gulp.src(cssfiles)
		.pipe(minifycss())
		.pipe(concat('villa.css'))
		.pipe(rename({
			extname: '.min.css'
		}))
		.pipe(gulp.dest('dist/css'));
});

gulp.task('js', function() {
	gulp.src(jsfiles)
		.pipe(jshint())
		.pipe(jshint.reporter('default'))
		.pipe(uglify({
			preserveComments: 'some'
		}))
		.pipe(rename({
			extname: '.min.js'
		}))
		.pipe(gulp.dest('dist/js'));
});

gulp.task('default', function() {
	var villa = ['css', 'js'];
	gulp.watch(villa);
});