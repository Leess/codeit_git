'use strict';

var gulp = require('gulp'),
    watch = require('gulp-watch'),
    plumber = require('gulp-plumber'),
    notify = require('gulp-notify'),
    uglify = require('gulp-uglify'),
    less = require('gulp-less'),
    prefixer = require('gulp-autoprefixer'),
    cssnano = require('gulp-cssnano'),
    csslint = require('gulp-csslint'),
    lessReporter = require('gulp-csslint-less-reporter'),
    jshint = require('gulp-jshint'),
    concat = require('gulp-concat'),
    order = require('gulp-order'),
    sourcemaps = require('gulp-sourcemaps'),
    browserSync = require('browser-sync').create(),
    imagemin = require('gulp-imagemin'),
    pngquant = require('imagemin-pngquant');

gulp.task('html', function () {
    gulp.src(['../*.html', '../*.php', ])
        .pipe(browserSync.stream());
});

gulp.task('css', function () {
    gulp.src(['less/plugins/*.less', 'less/plugins/*.css', 'less/*.less', ])
        .pipe(plumber({errorHandler: notify.onError("Error: <%= error.message %>")}))
        .pipe(sourcemaps.init())
        .pipe(less())
        .pipe(prefixer())
        .pipe(csslint('csslintrc.json'))
        .pipe(lessReporter('less/all.less'))
        .pipe(cssnano({
        convertValues: false,
        zindex: false,
    }))
        .pipe(concat('all.css'))
        .pipe(sourcemaps.write('../css'))
        .pipe(gulp.dest('../css'))
        .pipe(browserSync.stream());
});

gulp.task('js', function () {
    gulp.src('js/*.js')
        .pipe(jshint())
    // Use gulp-notify as jshint reporter 
        .pipe(notify(function (file) {
        if (file.jshint.success) return false;

        var errors = file.jshint.results.map(function (data) {
            if (data.error) {
                return "(" + data.error.line + ':' + data.error.character + ') ' + data.error.reason;
            }
        }).join("\n");
        return file.relative + " (" + file.jshint.results.length + " errors)\n" + errors;
    }))
        .pipe(plumber({errorHandler: notify.onError("Error: <%= error.message %>")}))
        .pipe(sourcemaps.init())
        .pipe(concat('scripts.js'))
        .pipe(uglify())
        .pipe(sourcemaps.write('../js'))
        .pipe(gulp.dest('../js'));

    gulp.src(['js/plugins/*.js'])
        .pipe(plumber({errorHandler: notify.onError("Error: <%= error.message %>")}))
        .pipe(concat('plugins.js'))
        .pipe(uglify())
        .pipe(gulp.dest('../js'));
});

gulp.task('images', function () {
    gulp.src('../images/**/*.*')
        .pipe(imagemin({
        progressive: true,
        use: [pngquant()],
        interlaced: true
    }))
        .pipe(gulp.dest('/images'));
});

gulp.task('browser-sync', function() {
    browserSync.init({
        proxy: '127.0.0.1'
    });
});

gulp.task('build', ['html', 'js', 'css']);

gulp.task('watch', function(){
    watch(['../*.html', '../*.php'], function(event, cb) {
        gulp.start('html');
    });

    watch(['less/*.less'], function(event, cb) {
        gulp.start('css');
    });

    watch(['js/*.js', 'js/*.json'], function(event, cb) {
        gulp.start('js');
        browserSync.reload;
    });
    gulp.watch('../js/*.js').on('change', browserSync.reload);
});

gulp.task('default', ['build', 'watch']);
gulp.task('local', ['build', 'browser-sync', 'watch']);
