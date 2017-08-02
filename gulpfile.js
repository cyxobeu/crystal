var gulp = require('gulp'),
    watch = require('gulp-watch'),
    plumber = require('gulp-plumber'),
    sass = require('gulp-sass'),
    csso = require('gulp-csso'),
    autoprefixer = require('gulp-autoprefixer'),
    browserSync = require('browser-sync').create(),
    uglify = require('gulp-uglify'),
    spritesmith = require('gulp.spritesmith'),
    pug = require('gulp-pug');

var Path = {
  js_path : "./src/js/*.js",
  sass_path : "./src/scss/*.scss",
  sprite_path : "./src/img/*.png",
  pug_path : "./src/pug/*.pug"
};

gulp.task('sprite', function () {
  var spriteData = gulp.src(Path.sprite_path)
  .pipe(spritesmith({
    imgName: 'sprite.png',
    cssName: 'sprite.scss',
    cssFormat: 'css',
    imgPath: '../img/sprite.png'
  }));
  var imgStream = spriteData.img
  .pipe(gulp.dest('./static/img'));
  var cssStream = spriteData.css
  .pipe(gulp.dest('./src/scss/'))
});

gulp.task('scss', function() {
  return gulp
  .src('./src/scss/style.scss')
  .pipe(plumber(function (error) {
    gutil.log(error.message);
    this.emit('end');
  }))
  .pipe(sass({
    css: './static/css',
    sass: './src/scss',
    images: './static/img'
  }))
  .pipe(autoprefixer({
    browsers: ['> 1%', 'Firefox > 0'],
    cascade: false
  }))
  // .pipe(csso({
  //     restructure: true,
  //     sourceMap: true,
  //     debug: true
  // }))
  .pipe(gulp.dest('./static/css'))
  .pipe(browserSync.reload({
    stream: true
  }));
});

gulp.task('scripts', function() {
  return gulp
  .src(Path.js_path)
  .pipe(plumber(function (error) {
    gutil.log(error.message);
    this.emit('end');
  }))
  // .pipe(uglify())
  .pipe(gulp.dest('./static/js'))
  .pipe(browserSync.reload({
    stream: true
  }));
});

gulp.task('views', function buildHTML() {
  return gulp.src('src/pug/*.pug')
  .pipe(pug())
  .pipe(gulp.dest('./'))
  .pipe(browserSync.reload({
    stream: true
  }));
});

gulp.task('browser-sync', function() {
    browserSync.init({
        server: {
            baseDir: "./"
        }
    });
});

gulp.task('default', function() {
  gulp.start('scss');
  gulp.start('scripts');
  gulp.start('views');
});

gulp.task('watch', ['browser-sync'], function() {
  watch(Path.sprite_path, function() {
    gulp.start('sprite');
  });
  watch(Path.sass_path, function() {
    gulp.start('scss');
  });
  watch(Path.js_path, function() {
    gulp.start('scripts');
  });
  watch(Path.pug_path, function() {
    gulp.start('views')
  })
});
