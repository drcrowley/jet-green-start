const gulp = require('gulp');
const webpack = require('webpack');
const notifier = require('node-notifier');
const gulplog = require('gulplog');
const fs = require('fs');
const browserSync = require('./serve.js');

let currMtime = 0;

gulp.task('scripts', (callback) => {
  const webpackConfig = require('../../webpack.config.js');

  webpack(webpackConfig, function(err, stats) {
    if (!err) {
      err = stats.toJson().errors[0];
    }
    if (global.changeManifest) {
      if (err) {
        notifier.notify({
          title: 'Webpack',
          message: err
        });

        gulplog.error(err);
      }

      if (!webpackConfig.watch && err) {
        global.changeManifest = false;
        callback(err);
      }

      gulplog.info(stats.toString({
        colors: true
      }));

      global.changeManifest = false;
      browserSync.reload();
      callback();
    }
  });
});
