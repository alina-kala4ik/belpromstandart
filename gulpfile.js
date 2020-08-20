"use strict";

var gulp = require("gulp");
var rename = require("gulp-rename");
var server = require("browser-sync").create();
var htmlmin = require("gulp-htmlmin");
var sourcemap = require("gulp-sourcemaps");
var sass = require("gulp-sass");
var postcss = require("gulp-postcss");
var autoprefixer = require("autoprefixer");
var csso = require("gulp-csso");
var jsminify = require("gulp-minify");
var del = require("del");

gulp.task("clean", function () {
  return del("build");
});

gulp.task("copy", function () {
  return gulp.src([
    "source/img/**",
  ], {
    base: "source"
  })
  .pipe(gulp.dest("build"))
})

gulp.task("html", function () {
  return gulp.src("source/*.html")
  .pipe(htmlmin({
    collapseWhitespace: true
  }))
  .pipe(gulp.dest("build"))
});

gulp.task("jscompress", function() {
  return gulp.src(["source/js/*.js"])
    .pipe(jsminify({
      ext: {
        min:'.min.js'
      },
      noSource: true,
    }))
    .pipe(gulp.dest('build/js'))
});


gulp.task("css", function () {
  return gulp.src("source/sass/style.scss")
  .pipe(sourcemap.init())
  .pipe(sass())
  .pipe(postcss([
    autoprefixer()
  ]))
  .pipe(csso())
  .pipe(rename("style.min.css"))
  .pipe(gulp.dest("build/css"))
  .pipe(server.stream());
});



gulp.task("server", function () {
  server.init({
    server: "build/",
    notify: false,
    open: true,
    cors: true,
    ui: false
  });

  gulp.watch("source/*.html", gulp.series("html", "refresh"));
  gulp.watch("source/sass/*/*.scss", gulp.series("css", "refresh"));
  gulp.watch("source/js/*.js", gulp.series("jscompress", "refresh"));
});


gulp.task("refresh", function (done) {
  server.reload();
  done();
});

gulp.task("build", gulp.series("clean", "copy", "html", "jscompress", "css"));
gulp.task("start", gulp.series("build", "server"));