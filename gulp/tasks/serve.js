const gulp = require('gulp');
const browserSync = require('browser-sync').create();

const pjson = require('../../package.json');
const dirs = pjson.config.directories;

console.log(dirs.build + 'scripts/script.js');

gulp.task('serve', () => {
  browserSync.init({
      server: dirs.build,
      open: false,
      ghostMode: false,
      notify: false,
      timestamps: false
  });
});