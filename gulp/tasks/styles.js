const gulp = require('gulp');
const gulpIf = require('gulp-if');
const plumber = require('gulp-plumber');
const notify = require('gulp-notify');
const sass = require('gulp-sass');
const sassGlob = require('gulp-sass-glob');
const postcss = require('gulp-postcss');
const sourcemaps = require('gulp-sourcemaps');
const inlineSvg = require('postcss-inline-svg');
const svgo = require('postcss-svgo');
const csso = require('gulp-csso');
const rename = require('gulp-rename');
const autoprefixer = require('autoprefixer');
const browserSync = require('./serve.js');

const pjson = require('../../package.json');
const dirs = pjson.config.directories;
const isProduction = !process.env.NODE_ENV || process.env.NODE_ENV == 'production';

gulp.task('styles', gulp.series('scss-lint',() => {
  return gulp.src(dirs.source + '/styles/main.scss')
    .pipe(plumber({
      errorHandler: notify.onError("Error: <%= error.message %>")
    }))
    .pipe(gulpIf(!isProduction, sourcemaps.init()))
    .pipe(sassGlob())
    .pipe(sass().on('error', sass.logError))
    .pipe(postcss([
      autoprefixer({ browsers: ['last 4 versions', 'IE 9'], cascade: false }),
      inlineSvg({
        path: dirs.source + '/icons'
      }),
      svgo()
    ]))
    .pipe(gulpIf(!isProduction, sourcemaps.write()))
    .pipe(gulpIf(isProduction, csso()))
    .pipe(rename('style.css'))
    .pipe(gulp.dest(dirs.build + '/styles'))
    .pipe(browserSync.stream());
}));