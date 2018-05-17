var path = require('path');
var archive = require('../helpers/archive-helpers');
var httpHelpers = require('../web/http-helpers');
var fs = require('fs');
// require more modules/folders here!

exports.handleRequest = function (req, res) {
  if (req.method === 'GET') {
    if (req.url === '/') {
      httpHelpers.serveAssets(res, archive.paths.siteAssets + '/index.html', fs.readFile);
    }
    if (req.url.match('styles.css')) {
      httpHelpers.serveAssets(res, archive.paths.siteAssets + '/styles.css', fs.readFile);
    }
  }


  // res.end(archive.paths.list);
};
