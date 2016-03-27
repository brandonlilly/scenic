var path = require('path');
var webpack = require('webpack');

var config = {
  devtool : 'eval-source-map',

  entry: [
    './app/index.js',
    './style/main.scss',
  ],
  output: {
    filename: 'bundle.js',
    path: path.join(__dirname, 'dist/generated'),
    publicPath: '/',
  },
  resolve: {
    extensions: ['', '.js', '.jsx', '.scss', '.css'],
    root: [ path.join(__dirname, 'app/') ],
  },
  module: {
    loaders: [
      {
        test: /\.js$/, loader: 'babel', exclude: /node_modules/,
        query: { presets: ['es2015', 'stage-0'] }
      },
      {
        test: /\.scss$/,
        loaders: ['style', 'css?sourceMap', 'sass?sourceMap'],
      },
    ]
  },
  sassLoader: {
    includePaths: [path.join(__dirname, "style")]
  }
};

module.exports = config;
