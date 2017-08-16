const gulp = require('gulp');
const through2 = require('through2').obj;
const File = require('vinyl');
const path = require('path');

let scripts = '';
const blocksDir = 'blocks/';

gulp.task('script-collector', () => {
  return gulp.src('src/blocks/**/*.js')
    .pipe(through2(
      function(file, enc, callback) {
        const filePath = file.path;

        scripts += `import '${filePath.slice(filePath.indexOf(blocksDir))}'\n`;
        callback();
      },
      function(callback) {
        let commonScript = new File({
          contents: new Buffer(scripts),
          cwd: process.cwd(),
          base: process.cwd() + '/src/scripts/',
          path: path.resolve(process.cwd(), 'src/scripts/index.js')
        });

        scripts = '';
        this.push(commonScript);
        callback();
      } 
    ))
    .pipe(gulp.dest('./src/scripts/'))
    .on('end', () => {
      global.changeManifest = true;
    });
});
