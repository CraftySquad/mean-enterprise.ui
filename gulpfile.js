/**
 * @type {Gulp}
 * @module gulpfile
 * @description - build the app in various modes
 *      gulp                                                // build for local environment
 *      gulp bump                                           // bump current version
 *      gulp karma-coverage                                 // run karma coverage report and exit
 *      gulp --dev                                          // build minified for deployment
 *
 *      --debug                                             // build debuggable version for deployment
 *      --server                                            // server on dev build (filewatch, livereload, server)
 */
var gulp = require('gulp');
var config = require('gulp-config')(gulp);

var conf = require('./config/build.conf.js');
var opts = require('./config/options.conf.js');
var env = require('./config/environments.conf.js');
var pkg = require('./package.json');

// load all 'gulp-' plugins
var $ = require('gulp-load-plugins')();
var argv = require('yargs').argv;
// utils
var _ = require('lodash');
var os = require('os-utils');
var del = require('del');
var runSequence = require('run-sequence');
// ensures stream ordering
var series = require('stream-series');
var karma = require('karma').server;
// logging
var log = $.util.log;
var blue = $.util.colors.blue.bold;
var red = $.util.colors.red.bold;

// command line options
var args = {
  debug: argv.debug,
  dev: argv.dev,
  server: argv.server
};

/**
 * default - build the application, start server, open browser, watch for
 * changes
 */
gulp.task('default', function() {
  log(blue('building ' + pkg.name +
           ' - version ' + pkg.version));

  // ensure tasks are run in sequence
  runSequence(
    'clean',
    'jshint',
    'jscs',
    'ngConstant',
    'copy-assets',
    'svgstore',
    'copy-static-html',
    // these tasks can run simultaneously
    ['app-js', 'vendor-js', 'build-css'],
    'inject-index',
    'unit-tests',
    'file-watch',
    'server',
    'liveReload'
  );
});

/**
 * watch src files for changes and run appropriate tasks
 */
gulp.task('file-watch', function() {
  // only watch for file changes on local builds
  if (isDeploy()) {
    log(red('skipping file watch'));
    return;
  }

  log(blue('watching for file changes...'));

  // on sass change
  gulp.watch(conf.app.sass, ['build-css']);
  // on app js change
  gulp.watch(conf.app.js, ['jshint', 'jscs', 'app-js']);
  // on template change
  gulp.watch(conf.app.tpl, ['app-js']);
  // on index change
  gulp.watch(conf.app.html, ['inject-index']);
  // on css change
  gulp.watch(conf.app.css, ['build-css']);
  // on static HTML change
  gulp.watch(conf.app.staticHtml, ['copy-static-html']);
  // on SVG change
  gulp.watch(conf.app.svg, ['svgstore']);
});

/**
 * liveReload - reload browser on file changes
 */
gulp.task('liveReload', ['open-browser'], function() {
  // only fire up liveReload on local builds
  if (isDeploy()) {
    log(red('skipping liveReload'));
    return;
  }

  /**
   * watch() allows us to reload changed files only
   */
  return gulp.src('./' + conf.dir.build + '/**')
    .pipe($.plumber({
      errorHandler: onError
    }))
    .pipe($.watch('./' + conf.dir.build + '/**'))
    .pipe($.connect.reload());
});

/**
 * clean the root build directory
 * pass callback to ensure task finishes before exiting
 */
gulp.task('clean', function(cb) {
  del([conf.dir.build],
    {
      force: true
    },
    cb);
});

/**
 * Watch for file changes and re-run tests on each change
 * overwrite browsers
 */
gulp.task('unit-tests', function() {
  karma.start({
    configFile: __dirname + '/config/karma.conf.js',
    singleRun: isDeploy()
  });
});

/**
 * run karma coverage report and exit
 */
gulp.task('karma-coverage', function() {
  karma.start({
    configFile: __dirname + '/config/karma.conf.js',
    singleRun: true
  });
});

/**
 * jshint - lints our js files
 */
gulp.task('jshint', function() {
  return gulp.src(conf.app.js)
    .pipe($.plumber({
      errorHandler: onError
    }))
    .pipe($.jshint('./config/.jshintrc'))
    .pipe($.jshint.reporter('default'));
});

/**
 * jscs - checks code against chosen style guide
 * currently using google code guide
 * other options located @
 * /Web.UI/node_modules/gulp-jscs/node_modules/jscs/presets
 */
gulp.task('jscs', function() {
  return gulp.src(conf.app.js)
    .pipe($.jscs('./config/.jscsrc'));
});

/**
 * ngConstant - updates path.js file with correct environment info
 */
gulp.task('ngConstant', function() {
  // get correct environment
  var environment = (args.dev || args.debug) ?
    env.environments.dev :
    env.environments.local;

  return gulp.src('')
    .pipe($.plumber({
      errorHandler: onError
    }))
    .pipe($.ngConstant({
      space: ' ',
      wrap: false,
      name: opts.appModuleName + '.config.path',
      constants: environment,
      dest: conf.dir.path + '/path.module.js'
    }))
    .pipe($.wrap('/* auto generated via gulp ngConstant task */\n' +
                 '// jscs:disable\n/* jshint ignore:start */\n\n' +
                 '<%= contents %>\n// jscs:enable\n/* jshint ignore:end */\n\n'))
    .pipe(gulp.dest(''));
});

/**
 * concat, ngAnnotate, uglify application files
 * wraps uglified output in IIFE
 * converts *.tpl.html files to injectable js modules
 * consider adding gulp-strip-debug for prod builds - strips console, debugger,
 * alert from js
 */
gulp.task('app-js', function() {
  // template js will be included in app js output during dev* builds
  return $.merge(
    gulp.src(conf.app.js),
    gulp.src(conf.app.tpl)
      .pipe($.html2js({
        base: 'src/app',
        outputModuleName: opts.appModuleName + '.templates',
        useStrict: true
      }))
      .pipe($.concat(opts.filePrefix + '.templates.js'))
      .pipe($.size({
        title: opts.appModuleName + '.templates'
      }))
  )
    .pipe($.plumber({
      errorHandler: onError
    }))
    // concat if not working locally
    .pipe((args.dev || args.debug) ?
      $.concat(opts.filePrefix + '.js') :
      $.util.noop())
    // annotate on dev build
    .pipe(args.dev ?
      $.ngAnnotate() :
      $.util.noop())
    // output a non-minified version
    .pipe(args.debug ?
      gulp.dest(conf.dir.build) :
      $.util.noop())
    // wrap output in IIFE on build
    .pipe((args.dev || args.debug) ?
      $.wrap('(function(){\n\'use strict\';\n<%= contents %>\n})();') :
      $.util.noop())
    // uglify on dev build
    .pipe(args.dev ?
      $.uglify({
        mangle: false,
        output: {
          preamble: opts.banner
        }
      }) :
      $.util.noop())
    // add min extension on dev build
    .pipe(args.dev ?
      $.rename({
        extname: '.min.js'
      }) :
      $.util.noop())
    // put js in src folder if working local
    .pipe(gulp.dest((args.dev || args.debug) ?
      conf.dir.build :
    conf.dir.build + '/src'));
});

/**
 * concat, ngAnnotate, uglify vendor js
 */
gulp.task('vendor-js', function() {
  return gulp.src(conf.vendor.js)
    .pipe($.plumber({
      errorHandler: onError
    }))
    .pipe($.concat(opts.filePrefix + '.vendor.js'))
    .pipe($.ngAnnotate())
    .pipe($.uglify({
      mangle: false
    }))
    .pipe($.rename({
      extname: '.min.js'
    }))
    .pipe(gulp.dest(conf.dir.build));
});

/**
 * concat sass and css
 */
gulp.task('build-css', function() {
  log(blue('generating the app\'s CSS from the scss'));

  var sassError = function(err) {
    log(red('Error compiling sass:' + JSON.stringify(err)));
    plug.util.beep();
  };

  return $.merge(
    gulp.src(conf.app.sass)
      .pipe($.sass({
        onError: sassError,
        outputStyle: 'compressed'
      })),
    gulp.src(conf.app.css),
    gulp.src(conf.vendor.css)
  )
    .pipe($.plumber({
      errorHandler: onError
    }))
    .pipe($.concat('app.css'))
    .pipe($.minifyCss({
      keepSpecialComments: 0
    }))
    .pipe($.rename({extname: '.min.css'}))
    .pipe(gulp.dest(conf.dir.build + '/assets/css'));
});

/**
 * Compile the SVG files into a master SVG.
 * @return {Stream}
 */
gulp.task('svgstore', function() {
  log(blue('compressing and combining SVGs'));
  return gulp.src(conf.app.svg)
    .pipe($.svgmin())
    .pipe($.svgstore())
    .pipe($.rename('svg.svg'))
    .pipe(gulp.dest(conf.dir.build + '/assets/images'));
});

/**
 * inject js and css into index
 */
gulp.task('inject-index', function() {
  // inject options
  var injectOptions = {
    ignorePath: '/' + conf.dir.build + '/',
    addRootSlash: false
  };

  // determine which file(s) to inject based on build params
  var appFiles = args.debug ?
    // inject debuggable js file
  conf.dir.build + '/' + opts.filePrefix + '.js' :
    args.dev ?
      // inject minified js file
    conf.dir.build + '/' + opts.filePrefix + '.min.js' :
      // inject src contents if no build param
    conf.dir.build + '/src/**/*.js';

  // vendor file stream
  var vendorStream = gulp.src(
    conf.dir.build + '/' + opts.filePrefix + '.vendor.min.js',
    {read: false});
  // app file stream
  var appStream = gulp.src(appFiles,
    {read: false});
  // css stream
  var cssStream = gulp.src(
    conf.dir.build + '/assets/css/app.min.css',
    {read: false});

  return gulp.src(conf.app.html)
    .pipe($.plumber({
      errorHandler: onError
    }))
    // inject vendor js at custom location
    .pipe($.inject(vendorStream,
      _.assign(_.clone(injectOptions), {'name': 'vendor'})))
    // inject app js
    .pipe($.inject(appStream, injectOptions))
    // inject css
    .pipe($.inject(cssStream, injectOptions))
    .pipe(gulp.dest(conf.dir.build));
});

/**
 * copy assets
 */
gulp.task('copy-assets', function() {
  return series(
    // copy app images
    gulp.src(conf.app.images)
      .pipe($.plumber({
        errorHandler: onError
      }))
      .pipe(gulp.dest(conf.dir.build + '/assets/images')),

    // copy vendor fonts
    gulp.src(conf.vendor.fonts)
      .pipe($.plumber({
        errorHandler: onError
      }))
      .pipe(gulp.dest(conf.dir.build + '/assets/fonts'))
  );
});

/**
 * Copies static HTML files from designers
 */
gulp.task('copy-static-html', function() {
  return gulp.src(conf.app.staticHtml)
    .pipe($.plumber({
      errorHandler: onError
    }))
    .pipe(gulp.dest(conf.dir.build));
});

/**
 * bump - Basic usage: Will patch the version
 * bower and package.json
 */
gulp.task('bump', function() {
  // bump bower and package.json
  return gulp.src(['./bower.json', './package.json'])
    .pipe($.bump({type: 'patch'}))
    .pipe(gulp.dest('./'));
});

/**
 * server - start a server on a specified port and directory
 */
gulp.task('server', function() {
  // only fire up server on local builds
  if (isDeploy()) {
    log(red('skipping server'));
    return;
  }

  $.connect.server({
    port: conf.serverPort,
    livereload: true,
    root: [conf.dir.build]
  });

  //var dir = __dirname + '/' + conf.dir.build;
  //
  ////1. run your script as a server
  //var server = $.liveServer.new('./config/server.js');
  //server.start();

  //2. run script with cwd args, e.g. the harmony flag
  //var server = gls.new(['--harmony', 'myapp.js']);
  //this will achieve `node --harmony myapp.js`
  //you can access cwd args in `myapp.js` via `process.argv`
  //server.start();
});

/**
 * open the app in a browser
 */
gulp.task('open-browser', function() {
  if (isDeploy()) {
    return;
  }

  var options = {
    url: 'http://localhost:' + conf.serverPort,
    app: getBrowser()
  };

  // An actual file must be specified or gulp will overlook the task.
  return gulp.src(conf.dir.build + '/index.html')
    .pipe($.open('', options));
});

/**
 * @method onError
 * @description display error
 * @param {string} err
 */
function onError(err) {
  log(red(err));
}

/**
 * @method getBrowser
 * @description return browser to use for liveReload
 */
function getBrowser() {
  if (os.platform().toLowerCase() === 'darwin') {
    return conf.browser.osx;
  }
  return conf.browser.windows;
}

/**
 * @method isLocal
 * @description checks if we are building for deployment or locally
 * @returns {boolean}
 */
function isDeploy() {
  return (args.dev || args.debug) && !args.server;
}
