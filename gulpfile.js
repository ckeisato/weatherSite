var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync').create();
var clean = require('gulp-clean');
var cssmin = require('gulp-cssmin');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var htmlmin = require('gulp-htmlmin');

var http = require('http');
var httpProxy = require('http-proxy');
// https://blog.nodejitsu.com/http-proxy-intro/

var node_modules_path = './node_modules';
var paths = {
  'node': './node_modules',
	'assets': './assets'
}

// remove files in the public folder
gulp.task('clean', function(){
	return gulp.src('./public/**', {read: false})
									.pipe(clean());
});

gulp.task('serve', function(){

	httpProxy.createServer(9000, 'localhost').listen(8000);

	http.createServer(function (req, res) {  
	  res.writeHead(200, { 'Content-Type': 'text/plain' });
	  res.write('request successfully proxied!' + '\n' + JSON.stringify(req.headers, true, 2));
	  res.end();
	}).listen(9000);

	browserSync.init({
		ui: {
    	port: 8000
		},		
		server: {
			baseDir: './public'
		}
	});

	gulp.watch(paths.assets + '/*.html' , ['pages']);
	gulp.watch(paths.assets + '/*.scss',['styles']);
	gulp.watch(paths.assets + '/js/*.js',['scripts']);

  gulp.watch(['public/**/*']).on('change', browserSync.reload);
});


gulp.task('pages', function(){
	return gulp.src([paths.assets + '/*'])
					.pipe(htmlmin({collapseWhitespace: true}))
					.pipe(gulp.dest('./public'), { base: '.' });
});

// compiles styles with foundation base styles
gulp.task('styles', function(){
	gulp.src(paths.assets + '/*.scss')
	.pipe(sass())
	.pipe(cssmin())
	.pipe(gulp.dest('./public'), { base: '.'});
});


gulp.task('data', function(){
	return gulp.src([
		paths.assets + '/data/*'
	]).pipe(gulp.dest('./public/data'));
})

gulp.task('scripts', function(){

	// index page
	gulp.src(paths.assets + '/js/*.js')
	  // .pipe(rename('index.min.js'))
		// .pipe(uglify())
		.pipe(gulp.dest('./public/js/'));
});

gulp.task('build', ['pages', 'styles', 'scripts']);

gulp.task('default', ['pages', 'styles', 'scripts', 'serve']);
