'use strict';

let gulp = require('gulp'),
  taskListing = require('gulp-task-listing'),
  rimraf = require('rimraf'),
  exec = require('child_process').exec,
  tslint = require('gulp-tslint'),
  fs = require('fs'),
  runSequence = require('run-sequence');

let info = {};
info.logDir = 'dist/log';
info.pidsDir = 'dist/pids';

gulp.task('default', taskListing);

gulp.task('clean', (cb) => {
  rimraf('./dist', cb);
});

// gulp.task('compile', ['clean', 'tsc', 'assets'], () => {
//   console.log('Clean and Compiled.')
// });
gulp.task('compile', (done) => {
  runSequence(
    'clean',
    'tsc',
    'assets',
    done
  );
});

gulp.task('watch-compile', () => {
  gulp.watch('src/**/*.ts', ['lint']);
  gulp.watch('src/**/*.ts', ['tsc']);
  gulp.watch('src/conf/**/*.json', ['copy']);
});

gulp.task('watch-test', () => {
  gulp.watch('dist/**/*spec.js', ['test']);
});

gulp.task('tsc', (done) => {
  exec('./node_modules/.bin/tsc', (err, stdOut, stdErr) => {
    console.log(stdOut);
    if (err) {
      done(err);
    }
    else {
      done();
    }
  });
});

gulp.task('lint', () => {
  return gulp.src('src/**/*.ts')
    .pipe(tslint())
    .pipe(tslint.report('verbose'));
});

gulp.task('assets', (done) => {
  runSequence(
    'copy-env-config',
    'copy-zschemas',
    'copy-pm2-config',
    done
    );
});

gulp.task('copy-env-config', () => {
  return gulp.src([
    'src/conf/**/*.json',
    '!src/conf/env/example',
    '!src/conf/env/example/**'
  ])
    .pipe(gulp.dest('./dist/conf'));
});

gulp.task('copy-zschemas', () => {
  return gulp.src([
    'src/lib/zschema/schemas/*.json'
  ])
    .pipe(gulp.dest('./dist/lib/zschema/schemas'));
});

gulp.task('copy-pm2-config', () => {
  return gulp.src([
    'src/conf/pm2.json'
  ])
    .pipe(gulp.dest('./dist/conf'));
});

gulp.task('test', (cb) => {

  var testCommand = [
    'NODE_ENV=test',
    './node_modules/.bin/istanbul',
    'cover',
    './node_modules/.bin/_mocha',
    '-x \'*_spec.js\'',
    '--root dist/',
    '--dir test/coverage',
    '--',
    '-R spec',
    '--recursive \'dist/**/*_spec.js\''
  ].join(' ');

  //console.log(testCommand); //cb();

  // exec('./node_modules/.bin/mocha --recursive dist/**/*spec.js', (err, stdOut, stdErr) => {
  exec(testCommand, (err, stdOut, stdErr) => {
    console.log(stdOut);
    console.log(stdErr);
    cb(err);
  });

});
