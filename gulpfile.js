const gulp = require("gulp");
const pug = require("gulp-pug");
const sass = require("gulp-sass");

gulp.task("sass", function () {
  gulp.src("css/*.sass")
    .pipe(sass())
    .pipe(gulp.dest("css"))
});

gulp.task("pug", function () {
  gulp.src("*.pug")
    .pipe(pug({
      pretty: true
    }))
    .pipe(gulp.dest("./"))
})

gulp.task("default", ["sass", "pug"], function() {
    gulp.watch("css/*.sass", ["sass"]);
    gulp.watch("*.pug", ["pug"]);
})