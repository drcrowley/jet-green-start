// Require all tasks in gulp/tasks, including subfolders
const gulp = require('gulp');
var FwdRef = require('undertaker-forward-reference');

gulp.registry(FwdRef());

require('require-dir')('./gulp/tasks', {recurse: true});