const gulp = require('gulp');
const through2 = require('through2').obj;
const File = require('vinyl');
const path = require('path');

let scripts = '';
const blocksDir = '../blocks/';

gulp.task('script-collector', () => {
  return gulp.src('src/blocks/**/*.js')
    .pipe(through2(
      function(file, enc, callback) {
        scripts += `import '${blocksDir + path.basename(file.path, '.js')}/${path.basename(file.path)}';\n`;

        console.log(scripts);
        callback();
      },
      function(callback) {
        const commonScript = new File({
          contents: new Buffer(scripts),
          base: process.cwd(),
          path: process.cwd() + '/index.js'
        });

        this.push(commonScript);
        callback();
      } 
    ))
    .pipe(gulp.dest('./src/scripts'))
});

gulp.watch('./src/scripts/index.js')
  .on('add', gulp.series('script-collector'))