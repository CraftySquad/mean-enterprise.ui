/**
 * @module environments
 * @description constants for different build types
 */
var pkg = require('../package.json');

module.exports = {
  dev: {
    'environment': {
      'ENV_TYPE': 'dev',
      'API_PATH': 'http://localhost:8100/',
      'VERSION': 'v ' + pkg.version
    }
  },
  deploy: {
    'environment': {
      'ENV_TYPE': 'deploy',
      'API_PATH': 'https://mean-ui.herokuapp.com/',
      'VERSION': 'v ' + pkg.version
    }
  }
};
