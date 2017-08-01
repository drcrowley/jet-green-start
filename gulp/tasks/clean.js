const gulp = require('gulp');
const del = require('del');

const pjson = require('../../package.json');
const dirs = pjson.config.directories;

gulp.task('clean', () => {
  return del(dirs.build + '/**/*');
});