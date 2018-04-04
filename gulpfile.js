/**
* Gulp tasks.
*/
const gulp = require('gulp'),
  addsrc = require('gulp-add-src'),
  concat = require('gulp-concat'),
  obfuscator = require('gulp-javascript-obfuscator'),
  ngAnnotate = require('gulp-ng-annotate'),
  runSequence = require('run-sequence'),
  del = require('del'),
  uglify = require('gulp-uglify-es').default,
  Server = require('karma').Server,
  tap = require('gulp-tap'),
  path = require('path'),
  template = require('gulp-template');

const dir = {
  dist: 'www',
  src: 'src'
};

// Language files
let languages = {};
gulp.task('languages', function () {
    return gulp.src('languages/**/*.json')
    .pipe(tap(function (file, t) {
        let locale = path.basename(file.path).substring(0,2);
        languages[locale] = JSON.parse(file.contents.toString());
    }));
});
gulp.task('i18n', function () {
    return gulp.src(dir.src + '/app/trtl.i18n.strings.js')
    .pipe(template({injectLanguages: JSON.stringify(languages)}))
    .pipe(gulp.dest(dir.dist + '/js'));
});


// Dependencies
const libs = [
    {
        src: [
            './node_modules/angular/angular.min.js',
            './node_modules/angular/angular.min.js.map'
        ],
        dest: dir.dist + '/public/angular'
    },
    {
        src: './node_modules/jquery-parallax.js/parallax.min.js',
        dest: dir.dist + '/public/parallax'
    },
    {
        src: './node_modules/bootstrap/dist/**/*',
        dest: dir.dist + '/public/bootstrap'
    }
];
function copyLib (lib) {
    return gulp.src(lib.src).pipe(gulp.dest(lib.dest));
};
gulp.task('copy-lib', function () {
    return Promise.all(libs.map(lib => copyLib(lib)));
});

// Clean up task
gulp.task('clean', function(cb) {
  return del([dir.dist], {force: true}, cb);
});

// Copy assets
gulp.task('copy-assets', function () {
  return gulp.src([
      dir.src + '/css/**/*',
      dir.src + '/fonts/**/*',
      dir.src + '/images/**/*',
      dir.src + '/js/**/*'
  ], {base: dir.src})
    .pipe(gulp.dest(dir.dist));
});

// Copy html files.
gulp.task('copy-html', function () {
  return gulp.src([dir.src + '/**/*.html'], {base: dir.src})
    .pipe(gulp.dest(dir.dist));
});

// Copy Module JS files.
gulp.task('modules', function() {
  return gulp.src(dir.src + '/app/**/*.module.js')
    .pipe(concat('trtl.modules.min.js'))
    .pipe(ngAnnotate())
    .pipe(uglify().on('error', function(e) {
      console.log(e);
    }))
    .pipe(gulp.dest(dir.dist + '/js'));
});

// Combine JS files.
gulp.task('combine', function () {
  return gulp.src(dir.src + '/config/**/*.js')
    .pipe(obfuscator({
      stringArray: true,
      stringArrayEncoding: true
    }))
    .pipe(addsrc.append([
        dir.src + '/app/**/*.js', '!' + dir.src + '/app/**/*.module.js',
        '!' + dir.src + '/app/**/*.test.js',
        '!' + dir.src + '/app/trtl.i18n.strings.js',
        '!' + dir.src + '/app/**/*.mock.js',
        '!' + dir.src + '/app/**/*.default.js'
    ]))
    .pipe(concat('trtl.min.js', {newLine: ';'}))
    .pipe(ngAnnotate())
    .pipe(uglify().on('error', function(e) {
      console.log(e);
      throw new Error('Can\'t uglify properly');
    }))
    .pipe(gulp.dest(dir.dist + '/js'));
});

// Build Task
gulp.task('build', function(cb) {
  runSequence(
    'clean',
    'languages',
    ['copy-assets', 'copy-lib', 'copy-html', 'modules', 'combine', 'i18n'],
    cb
  );
});

// Karma Tests
gulp.task('test', function(done) {
  new Server({
    configFile: __dirname + '/karma.conf.js',
    singleRun: true
  }, done).start();
});

// Default task
gulp.task('default', function(cb) {
  runSequence('test', 'build', cb);
});
