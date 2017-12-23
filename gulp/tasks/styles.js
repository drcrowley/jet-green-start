const gulp = require('gulp');
const gulpIf = require('gulp-if');
const plumber = require('gulp-plumber');
const notify = require('gulp-notify');
const sass = require('gulp-sass');
const moduleImporter = require('sass-npm-import');
const cssimport = require("gulp-cssimport");
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
const isDev = !process.env.NODE_ENV || process.env.NODE_ENV == 'dev';

gulp.task('styles', gulp.series('scss-lint',() => {
  return gulp.src(dirs.source + '/styles/main.scss')
    .pipe(plumber({
      errorHandler: notify.onError("Error: <%= error.message %>")
    }))
    .pipe(gulpIf(isDev, sourcemaps.init()))
    .pipe(sassGlob())
    .pipe(sass({ importer: moduleImporter({ prefix: '~',extensions: ['.scss', '.sass', '.css']}) }).on('error', sass.logError))
    .pipe(cssimport())
    .pipe(postcss([
      autoprefixer({
        browsers: ['last 4 versions', 'IE 9'], cascade: false }),
      inlineSvg({
        path: dirs.source + '/icons'
      }),
      svgo()
    ]))
    .pipe(gulpIf(isDev, sourcemaps.write()))
    .pipe(gulpIf(!isDev, csso()))
    .pipe(rename('style.css'))
    .pipe(gulp.dest(dirs.build + '/styles'))
    .pipe(browserSync.stream());
}));
