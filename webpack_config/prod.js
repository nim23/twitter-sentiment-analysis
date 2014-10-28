'use strict';
var webpack = require('webpack');
var path = require('path');
var ROOT_FOLDER = path.join(__dirname, '../', 'app', 'src', 'js');

module.exports = {
    entry: {
        main: path.join(ROOT_FOLDER,'main.js')
    },
    output:{
      path: path.join(ROOT_FOLDER, 'app', 'dist', 'js'),
      publicPath: '/dist/js/',
      filename: 'main.min.js'
    },
    module:{
        loaders: [
            { test: /\.js$/, loader: 'jsx-loader' },
        ]
    },
    plugins: [
      new webpack.optimize.UglifyJsPlugin()
    ]
};
