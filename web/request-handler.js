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

  if (req.method === 'POST') {
    let body = '';
    let statusCode = 201;
    httpHelpers.headers['Content-type'] = 'plain/text';
    res.writeHead(statusCode, httpHelpers.headers)
    req.on('data', (chunk) => {
      body += chunk;
      console.log('tHISSSS ISSSS BODY YYYYYYYYYYYYYY ',body)
    })
    req.on('end', ()=> {
      let url = body.slice(4);
      archive.isUrlArchived(url, function(exists){
        if (exists) {
          httpHelpers.serveAssets(res, url, fs.readFile);
        }
      })
    })
  }


  // res.end(archive.paths.list);
};
