const gulp = require('gulp');

const pjson = require('../../package.json');
const dirs = pjson.config.directories;

gulp.task('watch', () => {
	global.watch = true;

  gulp.watch([dirs.source + '/styles/**/*.scss', dirs.source + '/blocks/**/*.scss'], gulp.series('styles'));
  
  gulp.watch([dirs.source + '/templates/**/*.pug', dirs.source + '/blocks/**/*.pug'], gulp.series('templates'))
  .on('all', (event, filepath) => {
      global.emittyChangedFile = filepath;
      console.log(filepath);
  });

  gulp.watch([dirs.source + '/blocks/**/*.js'])
   .on('add', gulp.series('script-collector'))

  //gulp.watch([dirs.source + '/scripts/**/*.js', dirs.source + '/blocks/**/*.js'], gulp.series('scripts'));
  gulp.watch([dirs.source + '/images/*.{jpg,jpeg,gif,png,svg,ico}'], gulp.series('images'));
  gulp.watch([dirs.source + '/fonts/*.{woff,woff2,ttf,eot,otf,svg}'], gulp.series('fonts'));
  gulp.watch([dirs.source + '/uploads/*'], gulp.series('uploads'));
});