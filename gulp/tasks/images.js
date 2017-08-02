const gulp = require('gulp');
const newer = require('gulp-newer');
const imagemin = require('gulp-imagemin');
const pngquant = require('imagemin-pngquant');

const pjson = require('../../package.json');
const dirs = pjson.config.directories;

gulp.task('images', () => {
  return gulp.src(dirs.source + '/images/**/*.{jpg,jpeg,gif,png,svg,ico}', {since: gulp.lastRun('images')})
    .pipe(newer(dirs.build + '/images'))
    .pipe(imagemin({
      progressive: true,
      svgoPlugins: [{removeViewBox: false}],
      use: [pngquant()]
    }))
    .pipe(gulp.dest(dirs.build + '/images'));
});