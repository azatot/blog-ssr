const gulp = require('gulp');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const cssnano = require('gulp-cssnano');
const browserSync = require('browser-sync').create();
const plumber = require('gulp-plumber');

gulp.task('browser-sync', () => {
    browserSync.init({
        server: {
            baseDir: './dist',
        },
        notify: false
    })
});

gulp.task('scss', () => {
    return gulp.src('./dev/scss/**/*.scss')
        .pipe(plumber())
        .pipe(sass())
        .pipe(autoprefixer(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], {
            cascade: true
        }))
        .pipe(cssnano())
        .pipe(gulp.dest('./dist/css/'))
        .pipe(browserSync.stream())
});

// works!
gulp.task('default', () => {
    gulp.watch('./dev/scss/**/*.scss', gulp.series('scss'));
    gulp.watch('./dist/*.html', gulp.series('browser-sync')).on('change', () => browserSync.reload());
});
