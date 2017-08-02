const gulp = require('gulp');

const pjson = require('../../package.json');
const dirs = pjson.config.directories;

gulp.task('dev', gulp.series('build', gulp.parallel('serve', 'watch')));