const gulp = require('gulp');

const pjson = require('../../package.json');
const dirs = pjson.config.directories;

gulp.task('uploads', () => {
  return gulp.src(dirs.source + '/uploads/*')
    .pipe(gulp.dest(dirs.build + '/uploads'));
});