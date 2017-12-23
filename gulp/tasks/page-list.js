const gulp = require('gulp');
const pug = require('gulp-pug');
const fs = require('fs');

const pjson = require('../../package.json');
const dirs = pjson.config.directories;

gulp.task('page-list', () => {
  const pages = fs.readdirSync(dirs.build).filter((item) => {
    return fs.statSync(dirs.build + '/' + item).isFile() && /.html/.test(item) && item !== 'index.html';
  }).map((item) => {
    return item.replace('.html', '');
  });

  const data = {
    name: pjson.name,
    pages: pages
  };

  return gulp.src(['./gulp/utils/**/index.pug'])
    .pipe(pug({
      locals: data,
      pretty: true
    }))
    .pipe(gulp.dest(dirs.build));
});
