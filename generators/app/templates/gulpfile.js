const gulp = require("gulp");
const ts = require("gulp-typescript");
const merge = require("merge2");
const sourcemaps = require("gulp-sourcemaps");
const del = require("del");
const rollup = require("rollup");
// const rollupTypescript = require('rollup-plugin-typescript');
const ts2jsProject = ts.createProject("./tsconfig.json", {
  target: "es5",
  module: "commonjs",
  moduleResolution: "node"
});
const ts2esProject = ts.createProject("./tsconfig.json", {
  target: "es2015",
  module: "es2015",
  moduleResolution: "node"
});
const rollupConfig = require("./rollup.config");

const distForEs5 = "dist";
const distForEs6 = "dist-es";
const distForDts = "types";

gulp.task("clear", async cb => {
  del([distForEs5, distForEs6, distForDts], cb);
});

gulp.task("ts2es", ["clear"], function() {
  const tsResult = ts2esProject
    .src()
    .pipe(sourcemaps.init())
    .pipe(ts2esProject());

  return merge([
    tsResult.js.pipe(sourcemaps.write(".")).pipe(gulp.dest(distForEs6)),
    tsResult.dts.pipe(gulp.dest(distForDts))
  ]);
});

gulp.task("ts2js", ["clear"], function() {
  const tsResult = ts2jsProject
    .src()
    .pipe(sourcemaps.init())
    .pipe(ts2jsProject());

  return merge([
    tsResult.js.pipe(sourcemaps.write(".")).pipe(gulp.dest(distForEs5))
  ]);
});

gulp.task("build-min", ["clear"], async function() {
  const bundle = await rollup.rollup(rollupConfig);
  await bundle.write(rollupConfig.output);
});

gulp.task("build", ["ts2es", "ts2js", "build-min"], async function() {});
