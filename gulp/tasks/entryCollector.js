const gulp = require('gulp');
const through2 = require('through2').obj;
const File = require('vinyl');
const path = require('path');
const del = require('del');

let scripts = '';
const blocksDir = 'blocks/';

gulp.task('script-collector', () => {
  return gulp.src('src/blocks/**/*.js')
    .pipe(through2(
      function(file, enc, callback) {
        const filePath = file.path;

        scripts += `import '${filePath.slice(filePath.indexOf(blocksDir))}';\n`;
        callback();
      },
      function(callback) {
        const commonScript = new File({
          contents: new Buffer(scripts),
          base: process.cwd(),
          path: process.cwd() + '/index.js'
        });

        scripts = '';
        this.push(commonScript);
        callback();
      } 
    ))
    .pipe(gulp.dest('./src/scripts'))
});
