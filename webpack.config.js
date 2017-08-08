const webpack = require('webpack');
const path = require('path');

const isDev = !process.env.NODE_ENV || process.env.NODE_ENV == 'dev';
let flag = false;

module.exports = {
  entry: './src/scripts/index.js',
  output: {
      path: __dirname + '/build/scripts/',
      filename: 'script.js'
  },
  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.js$/,
        exclude: [
          path.resolve(__dirname, 'node_modules')
        ],
        loader: 'eslint-loader',
        options: {
          fix: true,
          failOnError: false,
          emitWarning: true,
          ignorePattern: __dirname + '/src/scripts/lib/'
        }
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: path.resolve(__dirname, 'src/blocks'),
        exclude: [
          path.resolve(__dirname, 'node_modules')
        ]
      }
    ]
  },
  devtool: isDev ? "cheap-inline-module-source-map" : null,
  watch: isDev,
  watchOptions: {
    ignored: /node_modules/,
    aggregateTimeout: 100
  },
  resolve: {
    modules: [
      path.resolve(__dirname, 'src'),
      path.resolve('./node_modules')
    ]
  },
  plugins: [
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.ProvidePlugin({
      $: 'jquery'
    })
  ]
}

if (!isDev) {
  module.exports.plugins.push(
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings:     false,
        drop_console: false,
        unsafe:       true
      }
    })
  );
}