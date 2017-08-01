const gulp = require('gulp');
const gulpIf = require('gulp-if');
const pug = require('gulp-pug');
const prettify = require('gulp-prettify');
const notify = require('gulp-notify');
const plumber = require('gulp-plumber');
const browserSync = require('browser-sync').create();
const emitty = require('emitty').setup('src/templates', 'pug');

const pjson = require('../../package.json');
const dirs = pjson.config.directories;

gulp.task('templates', () => {
  return gulp.src([dirs.source + '/templates/**/*.pug', '!' + dirs.source + '/templates/_*/*.pug'])
    .pipe(plumber({
      errorHandler: notify.onError("Error: <%= error.message %>")
    }))
    .pipe(gulpIf(global.watch, emitty.stream(global.emittyChangedFile)))
    .pipe(pug({
      pretty: true
    }))
    .pipe(prettify({indent_size: 2}))
    .pipe(gulp.dest(dirs.build))
    .on('end', browserSync.reload);
});