var gulp = require('gulp'), // Сообственно Gulp JS
    stylus = require('gulp-stylus'), // Плагин для Stylus
    browserSync = require('browser-sync'),
    myth = require('gulp-myth'), // Плагин для Myth - http://www.myth.io/
    csso = require('gulp-csso'), // Минификация CSS
    imagemin = require('gulp-imagemin'), // Минификация изображений
    uglify = require('gulp-uglify'), // Минификация JS
    concat = require('gulp-concat'); // Склейка файлов

 


         
         // Собираем Stylus
gulp.task('stylus', function() {
   return gulp.src('app/stylus/**/*.styl')
        .pipe(stylus())

    .pipe(gulp.dest('app/css')) // записываем css
    .pipe(browserSync.reload({stream: true}))
});


 



// Собираем JS
gulp.task('js', function() {
    gulp.src(['app/js/**/*.js'])
        .pipe(concat('index.js')) // Собираем все JS, кроме тех которые находятся в app/js/vendor/**
        .pipe(gulp.dest('app/js'))
        
});

// Копируем и минимизируем изображения

gulp.task('images', function() {
    gulp.src('app/img/**/*')
        .pipe(imagemin())
        .pipe(gulp.dest('dist/img'))

});

gulp.task('browser-sync', function() {
        browserSync({
            server: {
                baseDir: 'app'
            },
            notify: false
        });
    });




// Запуск сервера разработки gulp watch
gulp.task('watch',['browser-sync', ], function() {
         gulp.watch('app/stylus/**/*.styl',['stylus']);
         gulp.watch('app/*.html',browserSync.reload);
         gulp.watch('app/js/**/*.js', browserSync.reload);
    });
  















// Сборка проекта

gulp.task('build',['images', 'stylus','js'], function() {
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