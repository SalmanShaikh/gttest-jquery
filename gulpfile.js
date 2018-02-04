'use strict';
var gulp = require('gulp'),
    browserify    = require('gulp-browserify'),
    webserver     = require('gulp-webserver'),
    gutil         = require('gulp-util'),
    rename        = require('gulp-rename'),
    minifyCss     = require('gulp-minify-css'),
    sass          = require('gulp-sass'),
    browserSync   = require('browser-sync');

var src = './process',
    app = './builds/app';

gulp.task('js', function() {
  return gulp.src( src + '/js/script.js' )
    .pipe(browserify({
      debug: true
    }))
    .on('error', function (err) {
      console.error('Error!', err.message);
    })
    .pipe(gulp.dest(app + '/js'));
});

gulp.task('html', function() {
  gulp.src( app + '/**/*.html');
});

gulp.task('sass', function () {  
  var main_scss = src + '/sass/*.scss';
  var sass_includes = [
          './node_modules/susy/sass',
          './node_modules/breakpoint-sass/stylesheets',
          './node_modules/compass-mixins/lib'
        ];
        return gulp.src(main_scss)
          .pipe(sass({
            sourceComments: false,
            outputStyle: 'nested',
            includePaths: sass_includes,
            require: ['susy', 'breakpoint', 'compass-mixins']
          }))
          .on('error', function(err){
              console.error('Error!', err.message);
          })
          .pipe(gulp.dest(app + '/css')) // non-minified version
});

gulp.task('watch', function() {
  gulp.watch( src + '/js/**/*', ['js']);
  gulp.watch( src + '/sass/**/*.scss', ['sass']);
  gulp.watch([ app + '/**/*.html'], ['html']);
});

gulp.task('webserver', function() {
  gulp.src( app + '/')
    .pipe(webserver({
        livereload: true,
        open: true
    }));
});

gulp.task('default', ['watch', 'html', 'js', 'sass', 'webserver']);
