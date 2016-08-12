'use strict';

var gulp = require('gulp');
var babel = require('gulp-babel');

gulp.task('default', function () {
  return gulp.src('input_gaurd_es6.js').pipe(babel({
    presets: ['es2015']
  })).pipe(gulp.dest('dist'));
});

//# sourceMappingURL=gulpfile-compiled.js.map