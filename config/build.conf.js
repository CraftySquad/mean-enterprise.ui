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
    modules: 'src/app/**/*.module.js',
    js: [
      'src/app/**/*.js',
      '!src/app/**/*.module.js',
      '!src/app/**/*.spec.js'
    ],
    tpl: [
      'src/app/**/*.tpl.html'
    ],
    html: ['src/index.html'],
    // For UI Designers. Static HTML used as prototypes
    staticHtml: [],
    // SVG's to be concatenated and minified
    svg: ['src/app/assets/images/**/*.svg'],
    sass: 'src/app/assets/scss/site.scss',
    images: [
      'src/app/assets/images/**/*.*',
      '!src/app/assets/images/**/*.svg'
    ],
    mdIcons: [
      'src/app/assets/md-icons/**/*.svg'
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
      'vendor/angular/angular.min.js',
      'vendor/angular-ui-router/release/angular-ui-router.min.js',
      'vendor/angular-animate/angular-animate.min.js',
      'vendor/angular-aria/angular-aria.min.js',
      'vendor/angular-sanitize/angular-sanitize.min.js',
      'vendor/angular-material/angular-material.min.js',
      'vendor/angular-material-icons/angular-material-icons.min.js',
      'vendor/lodash/lodash.min.js'
    ],
    css: [
      'vendor/angular-material/angular-material.css',
      'vendor/angular-material-icons/angular-material-icons.css'
    ],
    assets: [],
    fonts: [
      'vendor/font-awesome/fonts/*.*'
    ]
  }
};
