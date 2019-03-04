var gulp = require('gulp');
var browserSync = require('browser-sync');

gulp.task('browser-sync', function() {
    browserSync.init({
        proxy: "scg.app"
    });
});
 
gulp.task('default', ['browser-sync'], function() {
    gulp.watch(['**/*.html'], browserSync.reload);
    gulp.watch(['css/**/*.css'], browserSync.reload);
    gulp.watch(['js/**/*.js'], browserSync.reload);
});