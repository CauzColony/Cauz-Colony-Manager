var gulp = require('gulp'),
	jshint = require('gulp-jshint'),
	jshintReporter = require('jshint-stylish'),
	liveReload = require('gulp-livereload'),
	server = require( 'gulp-develop-server' );

/*
 * Create variables for our project paths so we can change in one place
 */
var paths = {
		'src':['./models/**/*.js','./routes/**/*.js', 'keystone.js', 'package.json', 'gulpfile.js']
	},
	options = {
		'path': './keystone.js'
	};


// gulp lint
gulp.task('lint', function(){
	gulp.src(paths.src)
		.pipe(jshint())
		.pipe(jshint.reporter(jshintReporter));

});

gulp.task( 'server:restart', function() {
		gulp.src(paths.src)
		.pipe(server(options))
		.pipe(liveReload);
});

gulp.task('watch', function() {
   gulp.watch(paths.src, ['lint', 'server:restart']);
});

gulp.task('default',['server:restart', 'watch']);

