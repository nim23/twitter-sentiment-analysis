'use strict';
var path = require('path');
var DEST_FOLDER = path.join(__dirname, 'app', 'dist');
var gulp = require('gulp');
var webpack = require('gulp-webpack');
var concat = require('gulp-concat');
var minifyCSS = require('gulp-minify-css');

gulp.task('webpack', function(){
  return gulp.src('./no_op.js')
    .pipe(webpack(require('./webpack_config/prod.js')))
    .pipe(gulp.dest(path.join(DEST_FOLDER, 'js')));
});

gulp.task('css', function(){
  gulp.src(['./app/src/stylesheets/normalize.css', './app/src/stylesheets/app.css'])
    .pipe(concat('app.min.css'))
    .pipe(minifyCSS())
    .pipe(gulp.dest('./app/dist/stylesheets/'));
});

/*
From command line run gulp to run prod tasks.
Generates minified files for deployment.
*/
gulp.task('default', ['css', 'webpack']);

gulp.task('webpack-dev', function() {
  return gulp.src('./no_op.js')
    .pipe(webpack(require('./webpack_config/dev.js')))
    .pipe(gulp.dest(path.join(DEST_FOLDER, 'js')));
});

/*
From command line run gulp dev to run the dev tasks.
Runs a watch command for any changes in the client side Javascript and
compiles the files together.
*/
gulp.task('dev', ['webpack-dev']);
