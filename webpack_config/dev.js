'use strict';
var path = require('path');
var ROOT_FOLDER = path.join(__dirname, '../', 'app', 'src', 'js');

module.exports = {
    entry: {
        main: path.join(ROOT_FOLDER,'main.js')
    },
    output:{
      path: path.join(ROOT_FOLDER, 'app', 'dist', 'js'),
      publicPath: '/dist/js/',
      filename: 'main.js'
    },
    watch: true,
    module:{
        loaders: [
            { test: /\.js$/, loader: 'jsx-loader' },
            { test: /\.css$/, loader: 'style-loader!css-loader' },
        ]
    }
};
