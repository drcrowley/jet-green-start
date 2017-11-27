// Require all tasks in gulp/tasks, including subfolders
const gulp = require('gulp');
const fwdRef = require('undertaker-forward-reference');
const requireDir = require('require-dir');
gulp.registry(fwdRef());

requireDir('./gulp/tasks', {recurse: true});