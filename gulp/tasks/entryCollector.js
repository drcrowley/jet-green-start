const gulp = require('gulp');
const through2 = require('through2').obj;
const File = require('vinyl');
const path = require('path');

let scripts = '';

gulp.task('script-collector', () => {
  return gulp.src('src/blocks/**/*.js')
    .pipe(through2(
      function(file, enc, callback) {
        const filePath = file.path;
        const blockName = path.basename(filePath, '.js');

        scripts += `import 'blocks/${blockName}/${blockName}.js'\n`;
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
