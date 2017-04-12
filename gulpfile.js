var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var open = require('open');

var app = {
	srcPath: 'src/',
	devPath: 'build/',
	prdPath: 'dist/'
};

gulp.task('lib', function () {
	gulp.src('bower_components/**/*')
	.pipe(gulp.dest(app.devPath + 'vender'))
	.pipe(gulp.dest(app.prdPath + 'vender'))
	.pipe($.connect.reload());
});

gulp.task('html', function () {
	gulp.src(app.srcPath + '**/*.html')
	.pipe(gulp.dest(app.devPath))
	.pipe($.htmlmin({
        removeComments: true,//清除HTML注释
        collapseWhitespace: true,//压缩HTML
        collapseBooleanAttributes: true,//省略布尔属性的值 <input checked="true"/> ==> <input />
        removeEmptyAttributes: true,//删除所有空格作属性值 <input id="" /> ==> <input />
        removeScriptTypeAttributes: true,//删除<script>的type="text/javascript"
        removeStyleLinkTypeAttributes: true,//删除<style>和<link>的type="text/css"
        minifyJS: true,//压缩页面JS
        minifyCSS: true//压缩页面CSS
    }))
	.pipe(gulp.dest(app.prdPath))
	.pipe($.connect.reload());
});

gulp.task('json', function () {
	gulp.src(app.srcPath + 'data/*.json')
	.pipe(gulp.dest(app.devPath + 'data'))
	.pipe(gulp.dest(app.prdPath + 'data'))
	.pipe($.connect.reload());
});

gulp.task('less', function () {
	gulp.src(app.srcPath + 'less/*.less')
	.pipe($.less())
	.pipe(gulp.dest(app.devPath + 'css'))
	.pipe($.cssmin({
		advanced: true,//类型：Boolean 默认：true [是否开启高级优化（合并选择器等）]
        compatibility: 'ie7',//保留ie7及以下兼容写法 类型：String 默认：''or'*' [启用兼容模式； 'ie7'：IE7兼容模式，'ie8'：IE8兼容模式，'*'：IE9+兼容模式]
        keepBreaks: false,//类型：Boolean 默认：false [是否保留换行]
        keepSpecialComments: '*'
        //保留所有特殊前缀 当你用autoprefixer生成的浏览器前缀，如果不加这个参数，有可能将会删除你的部分前缀
	}))
	.pipe(gulp.dest(app.prdPath + 'css'))
	.pipe($.connect.reload());
});

gulp.task('js', function () {
	gulp.src(app.srcPath + 'scripts/**/*.js')
	.pipe($.concat('index.js'))
	.pipe(gulp.dest(app.devPath + 'js'))
	.pipe($.uglify())
	.pipe(gulp.dest(app.prdPath + 'js'))
	.pipe($.connect.reload());
});

gulp.task('image', function () {
	gulp.src(app.srcPath + 'image/**/*')
	.pipe(gulp.dest(app.devPath + 'image'))
	.pipe($.imagemin())
	.pipe(gulp.dest(app.prdPath + 'image'))
	.pipe($.connect.reload());
});

gulp.task('build', ['lib', 'html', 'json', 'less', 'js', 'image']);

gulp.task('clean', function () {
	gulp.src([app.devPath, app.prdPath])
	.pipe($.clean());
});

gulp.task('serve', function () {
	$.connect.server({
		root: [app.devPath],
		livereload: true, 	// 自动刷新
		port: 1234,

	});
	open('http://localhost:1234/index.html');

	gulp.watch('bower_components/**/*', ['lib']);
	gulp.watch(app.srcPath+'**/*.html', ['html']);
	gulp.watch(app.srcPath+'data/*.json', ['json']);
	gulp.watch(app.srcPath+'less/*.less', ['less']);
	gulp.watch(app.srcPath+'less/**/*.less', ['less']);
	gulp.watch(app.srcPath+'scripts/**/*.js', ['js']);
	gulp.watch(app.srcPath+'image/**/*', ['image']);
});

gulp.task('default', ['serve', 'build']);

