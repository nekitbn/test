var gulp = require('gulp');
//var connect = require('gulp-connect-multi');
 


//gulp.task('connect', connect.server({
//	host: '127.0.0.1',
//	root: ['site'],
//	port: 9090,
//	livereload: true,
//	open: {browser: 'google-chrome'}
//}));

var sass = require('gulp-sass');
var prefix = require('gulp-autoprefixer');
gulp.task('styles', function(){
	gulp.src('./dev/style.scss')
	.pipe(sass({
		outputStyle: 'compressed'
	}))
	.pipe(prefix('last 2 version'))
	.pipe(gulp.dest('./site/'));
	
});

var pug = require('gulp-pug');
gulp.task('templates', function(){
	gulp.src('./dev/pug/*.pug')
	.pipe(pug({
		collapseWhitespace: true
	}))
	.pipe(gulp.dest('./site/'));
});

var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
	gulp.task('scripts', function() {
		gulp.src('./dev/js/*.js')
		.pipe(concat('script.js'))
		.pipe(uglify())
		.pipe(gulp.dest('./site/'));
	});

var imagemin = require('gulp-imagemin');
gulp.task('imagemin', () =>
    gulp.src('./dev/images/*')
        .pipe(imagemin())
        .pipe(gulp.dest('./site/images'))
);

gulp.task('watcher', function(){
	gulp.watch('./dev/*/.pug',{cwd: './dev/'}, ['templates']);
	gulp.watch('./dev/scss/*.scss',{cwd: './dev/'}, ['styles']);
	gulp.watch('./dev/js/*.js',{cwd: './dev/'}, ['scripts']);
	gulp.watch('/images/*.{png,jpg,gif,svg}', {cwd: './dev/'}, ['imagemin']);
});	

gulp.task('default', ['styles', 'templates', 'scripts']);
gulp.task('dev', ['default', 'connect', 'watcher']);