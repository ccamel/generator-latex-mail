/* Copyright 2016 Christophe Camel
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
'use strict';
var gulp = require('gulp');
var exec = require('gulp-exec');
var print = require('gulp-print');
var changed = require('gulp-changed');
var rename = require("gulp-rename");
var del = require('del');

var outputPath = 'outputs'

/**
 * Clean the temp/ directory.
 */
gulp.task('clean:temp', function() {
  return del([
    'temp/**/*'
  ]);
});

/**
 * Clean all the generated files. This includes:
 *   - the temp/ directory (see 'clean:temp' task
 *   - the outputs/ directort (all pdf files)
 */
gulp.task('clean:all', ['clean:temp'], function() {
  return del([
    outputPath + '/**/*'
  ]);
});

/**
 * Generate the pdf from the tex files in directory letters/.
 *
 * Call xelatex command line.
 */
gulp.task('make', function() {
  gulp.src('letters/*.tex')
    .pipe(changed(outputPath, {
      extension: '.pdf'
    }))
    .pipe(exec(
      'xelatex --output-directory <%= options.outputPath %> <%= file.path %>', {
        pipeStdout: true,
        outputPath: outputPath
      }))
    .pipe(rename({
      extname: ".pdf"
    }))
    .pipe(print(function(filepath) {
      return 'generated: ' + filepath;
    }))
});

gulp.task('default', ['make']);
