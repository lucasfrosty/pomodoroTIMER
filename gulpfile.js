const gulp = require('gulp');
const shell = require('gulp-shell');
// const babel = require('gulp-babel');
// const rename = require('gulp-rename');
// const uglify = require('gulp-uglify');
// const uglifycss = require('gulp-uglifycss');
const sass = require('gulp-sass');
// const livereload = require('gulp-livereload');
const imagemin = require('gulp-imagemin');
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');


gulp.task('default', ['sass-compiler', 'yarn', 'watch']);

// Uglifies JS
// gulp.task('uglifyjs', () => {
//   gulp.src('src/s/*.js')
//   .pipe(babel({presets: ['es2015']}))
//   .pipe(uglify())
//   .pipe(rename({ suffix: '.min' }))
//   .pipe(gulp.dest('js/min'));
// });

// Uglifies CSS
// gulp.task('uglifycss', () => {
//   gulp.src('css/*.css')
//   .pipe(uglifycss())
//   .pipe(rename({ suffix: '.min' }))
//   .pipe(postcss([ autoprefixer() ]))﻿ // if using sass use this command there instead.
//   .pipe(gulp.dest('css/min'))
//   .pipe(livereload()); // if using sass use this command there instead.
// });

// Watch for saves
gulp.task('watch', () => {
  gulp.watch('src/sass/*.scss', ['sass-compiler']);
});

gulp.task('yarn', shell.task([
  'yarn start'
]));

// Minify images
gulp.task('images', () => {
  gulp.src('images/*')
  .pipe(imagemin())
  .pipe(gulp.dest('images/'))
});


// Compile Sass
gulp.task('sass-compiler', () => {
  gulp.src('src/sass/*.scss')
  .pipe(sass().on('error', sass.logError))
  .pipe(postcss([ autoprefixer({ browsers: ["> 0%"] }) ]))﻿﻿
  .pipe(gulp.dest('src/css'))
});
