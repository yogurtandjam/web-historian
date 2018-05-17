var path = require('path');
var fs = require('fs');
var archive = require('../helpers/archive-helpers');

exports.headers = {
  'access-control-allow-origin': '*',
  'access-control-allow-methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'access-control-allow-headers': 'content-type, accept',
  'access-control-max-age': 10, // Seconds.
  'Content-Type': 'text/html'
};

exports.serveAssets = function(res, asset, callback) {
  // Write some code here that helps serve up your static files!
  // (Static files are things like html (yours or archived from others...),
  // css, or anything that doesn't change often.)
  
//this is a helper function 
//the input decision is made before we run this
  callback(asset, 'utf8', (err, data) => {
    var response = 200;
    if (err) {
      throw err;
    } else {
      if (asset.match('css')) {
        this.headers['Content-Type'] = 'text/css';
      }
      if (asset.match('html')) {
        response = undefined;
      }
      res.writeHead(response, this.headers);
      if (data) {
        res.end(data);
      }
    }
  });
  
};



// As you progress, keep thinking about what helper functions you can put here!
