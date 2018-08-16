var gulp        = require('gulp'), // Сообственно Gulp JS
    sass        = require('gulp-sass'), // Плагин для Stylus
    browserSync = require('browser-sync'),
    myth        = require('gulp-myth'), // Плагин для Myth - http://www.myth.io/
    csso        = require('gulp-csso'), // Минификация CSS
    imagemin    = require('gulp-imagemin'),
    pngquant    = require('imagemin-pngquant'),
    uglify      = require('gulp-uglify'), // Минификация JS
    concat      = require('gulp-concat'); // Склейка файлов
    autoprefixer        = require('gulp-autoprefixer');

 


         
         // Собираем Stylus
gulp.task('sass', function() {
    return gulp.src('app/sass/**/*.sass')
    .pipe(sass())
    .pipe(autoprefixer(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], {cascade: true}))
    .pipe(gulp.dest('app/css'))
    .pipe(browserSync.reload({stream: true}))
});

 



// Собираем JS
gulp.task('js', function() {
    gulp.src(['app/js/**/*.js'])
        .pipe(concat('index.js')) // Собираем все JS, кроме тех которые находятся в app/js/vendor/**
        .pipe(gulp.dest('app/js'))
        
});

// Копируем и минимизируем изображения

gulp.task('img', function() {
    return gulp.src('app/img/**/*')
    .pipe(cache(imagemin({
        interlaced: true,
        progressive: true,
        svgoPlugins: [{removeViewBox: false}],
        use: [pngquant()]
    })))
    .pipe(gulp.dest('dist/img'));
});
gulp.task('browser-sync', function() {
        browserSync({
            server: {
                baseDir: 'app'
            },
            notify: false
        });
    });





  gulp.task('watch', ['browser-sync'], function() {
    gulp.watch('app/sass/**/*.sass', ['sass']);
    gulp.watch('app/*.html', browserSync.reload);
    gulp.watch('app/js/**/*.js', browserSync.reload);
});















// Сборка проекта

gulp.task('build',['img', 'sass','js'], function() {
  var buildCss = gulp.src(['app/css/main.css'
    ])
    .pipe(gulp.dest('dist/css')) // записываем css

    // js
    var buildJs = gulp.src(['app/js/**/*'])
        .pipe(gulp.dest('dist/js'));

        var buildFonts = gulp.src('app/fonts/**/*')
    .pipe(gulp.dest('dist/fonts'));

    // image
    var buildHtml = gulp.src('app/*html')
        .pipe(gulp.dest('dist'))

});
gulp.task('default', ['watch']);