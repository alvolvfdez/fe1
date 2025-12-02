const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const sourcemaps = require('gulp-sourcemaps');
const cleanCss = require('gulp-clean-css');
const rename = require('gulp-rename');
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const postcssInlineSvg = require('postcss-inline-svg');
const pxtorem = require('postcss-pxtorem');
const browserSync = require('browser-sync').create();
const merge = require('merge-stream');

// PostCSS processors
const postcssProcessors = [
  postcssInlineSvg({ removeFill: true, paths: ['./node_modules/bootstrap-icons/icons'] }),
  pxtorem({ 
    propList: ['font','font-size','line-height','letter-spacing','*margin*','*padding*'],
    mediaQuery: true 
  })
];

// Paths
const paths = {
  scss: {
    src: './scss/style.scss',
    dest: './css',
    watch: './scss/**/*.scss',
    components: './components/**/*.scss',
  },
  js: {
    bootstrap: './node_modules/bootstrap/dist/js/bootstrap.min.js',
    popper: './node_modules/@popperjs/core/dist/umd/popper.min.js',
    barrio: '../../contrib/bootstrap_barrio/js/barrio.js',
    dest: './js',
  },
};

// Compile main SCSS (normal + minificado)
function styles() {
  const normal = gulp.src(paths.scss.src)
    .pipe(sourcemaps.init())
    .pipe(
      sass({ includePaths: ['./node_modules/bootstrap/scss','../../contrib/bootstrap_barrio/scss'] })
      .on('error', sass.logError)
    )
    .pipe(postcss(postcssProcessors))
    .pipe(postcss([autoprefixer({ overrideBrowserslist: ['>1%', 'last 2 versions'] })]))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(paths.scss.dest))
    .pipe(browserSync.stream());

  const minified = gulp.src(paths.scss.src)
    .pipe(
      sass({ includePaths: ['./node_modules/bootstrap/scss','../../contrib/bootstrap_barrio/scss'] })
      .on('error', sass.logError)
    )
    .pipe(postcss(postcssProcessors))
    .pipe(postcss([autoprefixer({ overrideBrowserslist: ['>1%', 'last 2 versions'] })]))
    .pipe(cleanCss())
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest(paths.scss.dest))
    .pipe(browserSync.stream());

  return merge(normal, minified);
}

// Compile component SCSS
function createCssComponent(cb) {
  return gulp.src(paths.scss.components)
    .pipe(sourcemaps.init())
    .pipe(
      sass({ outputStyle: 'compressed', includePaths: ['./node_modules/bootstrap/scss','../../contrib/bootstrap_barrio/scss'] })
      .on('error', sass.logError)
    )
    .pipe(postcss(postcssProcessors))
    .pipe(postcss([autoprefixer({ overrideBrowserslist: ['>1%', 'last 2 versions'] })]))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('./components'))
    .pipe(browserSync.stream())
    .on('end', cb);
}

// Move JS files
function js() {
  return gulp.src([paths.js.bootstrap, paths.js.popper, paths.js.barrio])
    .pipe(gulp.dest(paths.js.dest))
    .pipe(browserSync.stream());
}

// BrowserSync + watch
function serve() {
  browserSync.init({
    proxy: "http://fe1.antonada.training.forcontu.com",
    open: false // importante si estás en headless
  });

  gulp.watch(paths.scss.watch, styles);
  gulp.watch(paths.scss.components, createCssComponent);
  gulp.watch([paths.js.bootstrap, paths.js.popper, paths.js.barrio], js)
      .on('change', browserSync.reload);
}

// Build
const build = gulp.series(styles, gulp.parallel(js));

exports.styles = styles;
exports.js = js;
exports.serve = serve;
exports.createCssComponent = createCssComponent;
exports.default = build;
