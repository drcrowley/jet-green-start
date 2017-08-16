const gulp = require('gulp');

const pjson = require('../../package.json');
const dirs = pjson.config.directories;

gulp.task('build', gulp.series(
  'clean',
  'script-collector',
  gulp.parallel('styles', 'templates', 'fonts', 'images', 'uploads', 'scripts'),
  'page-list'
));

// gulp.task('build', gulp.series(
//   'clean',
//   'scripts',
//   // gulp.parallel('styles', 'templates', 'fonts', 'images', 'uploads', 'scripts'),
//   'page-list'
// ));