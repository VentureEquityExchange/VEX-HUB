var path = require('path'),
    rootPath = path.normalize(__dirname + '/..'),
    env = process.env.NODE_ENV || 'development';

var DB_HOST = process.env.DB_1_PORT_27017_TCP_ADDR || 'localhost';

var config = {
  development: {
    root: rootPath,
    app: {
      name: 'vex-hub'
    },
    port: 3000,
    db: 'mongodb://'+DB_HOST+'/vex-hub-development'
  },

  test: {
    root: rootPath,
    app: {
      name: 'vex-hub'
    },
    port: 3000,
    db: 'mongodb://'+DB_HOST+'/vex-hub-test'
  },

  production: {
    root: rootPath,
    app: {
      name: 'vex-hub'
    },
    port: 3000,
    db: 'mongodb://'+DB_HOST+'/vex-hub-production'
  }
};

module.exports = config[env];
