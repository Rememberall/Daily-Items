var gulp = require('gulp');
var nodemon = require('gulp-nodemon');
var livereload = require('gulp-livereload');

gulp.task('js', function () {
    gulp.src('./angular/js/**/*.js')
        .pipe(livereload());
});

gulp.task('html', function () {
    gulp.src(['./angular/index.html', './angular/templates/**/*.html'])
        .pipe(livereload());
});

gulp.task('style', function() {
    gulp.src('./angular/style/**/*.css')
        .pipe(livereload());
});

gulp.task('dev:angular', ['js', 'html', 'style'], function () {
    gulp.watch('./angular/js/**/*.js', ['js']);
    gulp.watch(['./angular/index.html', './angular/templates/**/*.html'], ['html']);
    gulp.watch('./angular/style/**/*.css', ['style']);
});

gulp.task('dev:node', function () {
    nodemon({
        script: './node/index.js',
        ext: 'js',
        ignore: ['angular*', 'gulp*', 'node_modules*']
    });
});

gulp.task('dev', ['dev:angular', 'dev:node'], function () {
    livereload.listen();
});
