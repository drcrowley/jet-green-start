const webpack = require('webpack');
const path = require('path');
const glob = require("glob");

const isDev = false;

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
        exclude: [
          path.resolve(__dirname, 'node_modules')
        ],
      }
    ]
  },
  devtool: "cheap-inline-module-source-map",
  watch: true,
  resolve: {
    alias: {
      $: "node_modules/jquery/dist"
    },
    modules: [
      path.resolve(__dirname),
      'node_modules'
    ]
  },
  plugins: [
    new webpack.NoEmitOnErrorsPlugin()
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