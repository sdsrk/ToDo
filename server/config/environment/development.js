'use strict';

// Development specific configuration
// ==================================
module.exports = {
  // MongoDB connection options
  mongo: {
    uri: 'mongodb://localhost/todo-dev'
  },

  seedDB: true,
  google: {
    clientID: '177085260127-viq2qum7am03d5qn5pgst53a44dv6l0b.apps.googleusercontent.com',
    clientSecret: '1SzR0QUZXHDphk6Un3Su8bNw',
    callbackURL: 'http://localhost:9000/auth/google/callback'
  }
};
