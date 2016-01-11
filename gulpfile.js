// Node.js modules
var fs = require('fs');
var path = require('path');
var url = require('url');
var gulp = require('gulp');
var _ = require('lodash');

// Gulp dependencies
var qunit	= require('gulp-qunit');
var connect = require('gulp-connect');
var open = require('gulp-open');
var jshint = require('gulp-jshint');
var concat = require('gulp-concat');
var tap = require('gulp-tap');
var uglify = require('gulp-uglify');
var rename = require("gulp-rename");
var clean = require('gulp-clean');
var seq = require('gulp-sequence');
var header = require('gulp-header');

// Read package.json
var pkg = JSON.parse(fs.readFileSync('./package.json'));

// Configurations
var cfg = {
	src: './src/seotory/',
	dist: './dist/',
	test: './test/total.html',

	server: {
		protocol: 'http',
		hostname: 'localhost',
		port: 8889
	},

	banner: [
		'/*!',
		' * <%= name %>',
		' * <%= description %> v<%= version %>',
		' *',
		' * Copyright (c) <%= new Date().getFullYear() %> seotory',
		' * <%= homepage %>',
		' */\n\n'
	].join('\n')
};

// Remove files and folders
gulp.task('clean', function() {
	return gulp
		.src(cfg.dist, {
			read: false
		})
		.pipe(clean({
			force: true
		}));
});

// Create js files
gulp.task('create', function() {
	var fileData = {
		PKG_VERSION: pkg.version
	};

	return gulp
		.src([
			cfg.src + 'intro.js',
			cfg.src + 'core.js',
			cfg.src + '*/*.js',
			cfg.src + 'outro.js',
		])

		.pipe(tap(function (file, t) {
			if (file.stat.isDirectory()) {
				return;
			}

			var fileinfo = path.parse(file.path);
			var contents = file.contents.toString();

			fileData.FOLDER_NAME = path.relative(cfg.src, fileinfo.dir);
			fileData.FILE_NAME = fileinfo.name;

			var compiled = _.template(contents);
			var newContents = compiled(fileData);

			file.contents = new Buffer(newContents);
		}))

		.pipe(concat('seotory.js', {
			newLine: '\n\n'
		}))

		.pipe(header(cfg.banner, pkg))

		.pipe(jshint())
		.pipe(jshint.reporter('jshint-stylish'))

		.pipe(gulp.dest(cfg.dist))

		.pipe(uglify({
			output: {
				comments: /^!/i
			}
		}))

		.pipe(rename({
			suffix: '-' + pkg.version + '.min',
			extname: '.js'
		}))

		.pipe(gulp.dest(cfg.dist));
});

// Unit test
gulp.task('unitTest', function() {
	return gulp
		.src(cfg.test)
		.pipe(qunit({
			'phantomjs-options': ['--ssl-protocol=any']
		}));
});

// Start server
gulp.task('server', function() {
	connect.server({
		port: cfg.server.port,
		livereload: true
	});
});

// Reload server
gulp.task('server:reload', function() {
	return gulp
		.src(cfg.test)
		.pipe(connect.reload());
});

// Open an URL in browser
gulp.task('open', function() {
	return gulp
		.src(cfg.test)
		.pipe(open({
			uri: url.resolve(url.format(cfg.server), cfg.test),
			app: 'Chrome'
		}));
});

// Watch tasks
gulp.task('watch', function() {
	gulp.watch([cfg.dist + '**/*'], ['server:reload']);
});

// Main tasks
gulp.task('build', ['create']);
gulp.task('test', seq('clean', 'build', 'unitTest'));
gulp.task('dev', seq('test', 'server', 'watch', 'open'));
gulp.task('default', ['dev']);