const gulp = require('gulp');
const gulpIf = require('gulp-if');
const pug = require('gulp-pug');
const prettify = require('gulp-prettify');
const notify = require('gulp-notify');
const plumber = require('gulp-plumber');
const browserSync = require('./serve.js');
const emitty = require('emitty').setup('src', 'pug');

const pjson = require('../../package.json');
const dirs = pjson.config.directories;

gulp.task('templates', () => {
  return gulp.src([dirs.source + '/templates/**/*.pug', '!' + dirs.source + '/templates/_*/*.pug'])
    .pipe(plumber({
      errorHandler: notify.onError("Error: <%= error.message %>")
    }))
    .pipe(gulpIf(global.emittyChangedFile, emitty.stream(global.emittyChangedFile)))
    .pipe(pug({
      locals: requireUncached('../../src/templates/data.json'),
      pretty: true
    }))
    .pipe(prettify({indent_size: 2}))
    .pipe(gulp.dest(dirs.build))
    .on('end', browserSync.reload);
});

function requireUncached( $module ) {
  delete require.cache[require.resolve( $module )];
  return require( $module );
}
