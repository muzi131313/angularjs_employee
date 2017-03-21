var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var open = require('open');

var app = {
	srcPath: 'src/',
	devPath: 'build/',
	prdPath: 'dist/'
};

gulp.task('lib', function () {
	gulp.src('bower_components/**/*.js')
	.pipe(gulp.dest(app.devPath + 'vendor'))
	.pipe(gulp.dest(app.prdPath + 'vender'));
});

gulp.task('html', function () {
	gulp.src(app.srcPath + '**/*.html')
	.pipe(gulp.dest(app.devPath))
	.pipe(gulp.dest(app.prdPath));
});

gulp.task('json', function () {
	gulp.src(app.srcPath + 'data/*.json')
	.pipe(gulp.dest(app.devPath))
	.pipe(gulp.dest(app.prdPath));
});

gulp.task('less', function () {
	gulp.src(app.srcPath + 'less/*.less')
	.pipe($.less())
	.pipe(gulp.dest(app.devPath + 'css'))
	.pipe($.cssmin())
	.pipe(gulp.dest(app.prdPath + 'css'));
});

gulp.task('js', function () {
	gulp.src(app.srcPath + 'scripts/**/*.js')
	.pipe($.concat('index.js'))
	.pipe(gulp.dest(app.devPath + 'js'))
	.pipe($.uglify())
	.pipe(gulp.dest(app.prdPath + 'js'));
});