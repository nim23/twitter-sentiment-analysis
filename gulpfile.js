'use strict';
var path = require('path');
var DEST_FOLDER = path.join(__dirname, 'app', 'dist');
var gulp = require('gulp');
var webpack = require('gulp-webpack');

gulp.task('webpack-dev', function() {
  return gulp.src('./no_op.js')
    .pipe(webpack(require('./webpack_config/dev.js')))
    .pipe(gulp.dest(path.join(DEST_FOLDER, 'js')))
});

gulp.task('default', ['webpack-dev']);
