const gulp = require('gulp');
const plumber = require('gulp-plumber');
const notify = require('gulp-notify');
const postcss = require('gulp-postcss');
const stylelint = require('stylelint');
const reporter = require('postcss-reporter');
const syntax_scss = require('postcss-scss');

const pjson = require('../../package.json');
const dirs = pjson.config.directories;

gulp.task('scss-lint', () => {
  return gulp.src([dirs.source + '/styles/**/*.scss', dirs.source + '/blocks/**/*.scss', '!' + dirs.source + '/styles/vendor/*.scss'])
    .pipe(plumber({
      errorHandler: notify.onError("Error: <%= error.message %>")
    }))
    .pipe(postcss([
      stylelint(),
      reporter({
        clearAllMessages: true,
        throwError: true
      })
    ], {syntax: syntax_scss}))
    .pipe(plumber.stop());
});