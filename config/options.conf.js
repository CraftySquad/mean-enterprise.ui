/**
 * this module contains options for the gulp / build process
 */
var pkg = require('../package.json');
var date = new Date();

module.exports = {
  /**
   * app module name
   */
  appModuleName: 'meanEnt',

  /**
   * file prefix to use in output names
   */
  filePrefix: pkg.name + '-' + pkg.version,

  /**
   * banner to prepend to application file
   */
  banner: '/**\n' +
  ' * ' + pkg.name + ' - v' + pkg.version + ' - ' + date.toUTCString() + '\n' +
  ' * ' + pkg.description + '\n' +
  ' * ' + pkg.homepage + '\n' +
  ' * Copyright (c) ' + date.getFullYear() + ' - ' + pkg.author + '\n' +
  ' */\n'
};
