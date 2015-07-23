/**
 * This file/module contains all configuration for the build process.
 */
module.exports = {
  /**
   * build:   app working folder
   * path:    location of path file
   */
  dir: {
    build: 'build',
    path: 'src/app/common/config'
  },

  /**
   * server configurations
   * serverPort - port to run local development server
   * browser - browser to open {OS X: 'Google Chrome', Windows: 'chrome'}
   */
  serverPort: 8100,
  browser: {
    osx: 'google chrome',
    windows: 'chrome'
  },

  /**
   * collection of files that make up our application
   */
  app: {
    js: [
      'src/app/**/*.js',
      '!src/app/**/*.spec.js'
    ],
    tpl: [
      'src/app/**/*.tpl.html'
    ],
    html: ['src/index.html'],
    staticHtml: [], // For UI Designers. Static HTML used as prototypes
    svg: ['src/app/shared/assets/images/**/*.svg'], // SVG's to be concatenated and minified
    sass: 'src/app/shared/scss/site.scss',
    images: [
      'src/app/shared/assets/images/**/*.*',
      '!src/app/shared/assets/images/**/*.svg'
    ],
    css: [],
    jsunit: [
      'vendor/angular-mocks/angular-mocks.js',
      'src/app/**/*.spec.js',
      'data/**/*.js'
    ]
  },

  /**
   * files to include in jasmine-node tests
   */
  jasmineNode: {
    js: [
      'tests/api'
    ]
  },

  /**
   * collection of vendor files
   */
  vendor: {
    js: [
      'vendor/angular/angular.js',
      'vendor/angular-ui-router/release/angular-ui-router.js',
      'vendor/angular-loading-bar/build/loading-bar.min.js',
      'vendor/angular-animate/angular-animate.js',
      'vendor/angular-sanitize/angular-sanitize.min.js',
      'vendor/angular-foundation/mm-foundation.min.js',
      'vendor/angular-foundation/mm-foundation-tpls.min.js',
      'vendor/lodash/lodash.min.js',
      'vendor/angular-toastr/dist/angular-toastr.tpls.min.js'
    ],
    css: [
      'vendor/font-awesome/css/font-awesome.min.css',
      'vendor/angular-block-ui/dist/angular-block-ui.css',
      'vendor/angular-toastr/dist/angular-toastr.css'
    ],
    assets: [],
    fonts: [
      'vendor/font-awesome/fonts/*.*'
    ]
  }
};
