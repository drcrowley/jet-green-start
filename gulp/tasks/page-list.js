const gulp = require('gulp');
const fs = require('fs');

const pjson = require('../../package.json');
const dirs = pjson.config.directories;

gulp.task('page-list', (done) => {
  var files = fs.readdirSync(dirs.build).filter((item) =>  {
    return fs.statSync(dirs.build + '/' + item).isFile() && /.html/.test(item) && item !== 'index.html';
  });
  var list = '';

  files.forEach((fileItem) => {
    list += '<li><a href="'+ fileItem +'">' + fileItem + '</a></li>';
  });
  var template = '<ul>' + list + '</ul>';

  fs.writeFile(dirs.build + '/index.html', template, (err) => {
    if(err) throw err;
    console.log("The file was created!");
    done();
  });
});