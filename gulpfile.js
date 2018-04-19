var gulp = require('gulp'),
		browserSync = require('browser-sync').create(),
		sass = require('gulp-sass'),
		sourcemaps = require('gulp-sourcemaps');


// Static Server + watching scss/html files
gulp.task('serve', function() {

	browserSync.init({
			server: "./public_html",
			notify: false
	});

	gulp.watch("scss/**/*.scss", ['sass']);
	gulp.watch("public_html/*.html").on('change', browserSync.reload);
});

// Compile sass into CSS & auto-inject into browsers
gulp.task('sass', function() {
	return gulp.src("scss/*.scss")
		.pipe(sourcemaps.init())
		.pipe(sass({indentType: 'tab', indentWidth: 1 }).on('error', sass.logError))
		.pipe(sourcemaps.write('./'))
		.pipe(gulp.dest("public_html/css"))
		.pipe(browserSync.stream());
});

gulp.task('default', ['sass', 'serve']);