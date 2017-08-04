const gulp = require('gulp');
const webpack = require('webpack');
const webpackConfig = require('../../webpack.config.js');
const notifier = require('node-notifier');
const gulplog = require('gulplog');

function done(err, stats) {
  if (err) {
    console.log(err);
  }
}

gulp.task('webpack', function(callback) {
  webpack(webpackConfig, function(err, stats) {
    if (!err) {
      err = stats.toJson().errors[0];
    }

    if (err) {
      notifier.notify({
        title: 'Webpack',
        message: err
      });

      gulplog.error(err);
    } else {
      gulplog.info(stats.toString({
        colors: true
      }));
    }

    // task never errs in watch mode, it waits and recompiles
    if (!webpackConfig.watch && err) {
      callback(err);
    } else {
      callback();
    }
  });
});
