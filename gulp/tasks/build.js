const gulp = require('gulp');

const pjson = require('../../package.json');
const dirs = pjson.config.directories;

gulp.task('build', gulp.series(
  'clean',
  gulp.parallel('styles', 'templates', 'fonts', 'images', 'uploads'),
  'page-list'
));