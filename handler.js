'use strict';
var auth = require('auth');

// Public API
module.exports.publicEndpoint = (event, context, cb) => {
  cb(null, { message: 'Welcome to our Public API!' });
};

// Private API
module.exports.privateEndpoint = (event, context, cb) => {
  auth.authorize(event, context, cb);
  cb(null, { message: 'Only logged in users can see this' });
};
