'use strict';

var gulp=require("gulp");
var sass=require("gulp-sass");

sass.compiler=require("node-sass");


//创建一个gulp的任务，任务名sass
gulp.task("sass",function(){
    return gulp.src("./src/sass/**/*.scss")
        .pipe(sass().on("error",function(){console.log("sass is error")}))
        .pipe(gulp.dest("./src/css"))
})

gulp.task("sass:watch",function(){
    gulp.watch("./src/sass/**/*.scss",["sass"])
})


gulp.task("default",["sass:watch"],function(){
    
})