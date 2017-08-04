const gulp = require('gulp');

const pjson = require('../../package.json');
const dirs = pjson.config.directories;

gulp.task('fonts', () => {
  return gulp.src(dirs.source + '/fonts/*.{woff,woff2,ttf,eot,otf,svg}')
    .pipe(gulp.dest(dirs.build + '/fonts'));
});