/**
 * @module environments.conf.js
 * @description constants for different build types
 */
var pkg = require('../package.json');

module.exports = {
  environments: {
    local: {
      'environment': {
        'ENV_TYPE': 'working',
        'API_PATH': 'http://localhost:8100/',
        'VERSION': 'v ' + pkg.version
      }
    },
    dev: {
      'environment': {
        'ENV_TYPE': 'dev',
        'API_PATH': 'https://mean-ui.herokuapp.com/',
        'VERSION': 'v ' + pkg.version
      }
    }
  }
};
