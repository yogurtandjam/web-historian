var path = require('path');
var archive = require('../helpers/archive-helpers');
var httpHelpers = require('../web/http-helpers');
var fs = require('fs');
var http = require('http');
// require more modules/folders here!

exports.handleRequest = function (req, res) {


  if (req.method === 'GET') {
    if (req.url === '/') {
      httpHelpers.serveAssets(res, archive.paths.siteAssets + '/index.html', fs.readFile);
    }
    if (req.url.match('styles.css')) {
      httpHelpers.serveAssets(res, archive.paths.siteAssets + '/styles.css', fs.readFile);
    }
    else {
      // let url = req.url.slice(4);
      console.log(req.url)
      archive.isUrlArchived(req.url, function(exists) {
        if (exists) {
          httpHelpers.serveAssets(res, url, fs.readFile);
        }
      })
    }
  }

  if (req.method === 'POST') {
    let body = '';
    let statusCode = 201;
    httpHelpers.headers['Content-type'] = 'plain/text';
    res.writeHead(statusCode, httpHelpers.headers)
    req.on('data', (chunk) => {
      body += chunk;
    })
    req.on('end', ()=> {
      let url = body.slice(4);
      console.log(url)
      archive.isUrlArchived(url, function(exists){
        if (exists) {
          httpHelpers.serveAssets(res, url, fs.readFile);
        } else {
          archive.isUrlInList(url, function(exists, err) {
            if (exists) {
              console.log('url is in the list', url)
              http.get('http://www.youtube.com/', (res) => {
                // if(res.statusCode !== 200){console.log('error')}
                res.setEncoding('utf8');
                let rawData = '';
                res.on('data', (chunk) => {rawData += chunk})
                console.log(rawData)
                if(rawData) {
                    archive.downloadUrls(url, rawData);
                  }
              })
            } else {
              archive.addUrlToList(url, function() {
                archive.isUrlInList(url, function(exists) {
                  if (exists) {console.log('url is now in list')}
                  else {console.log('something went wrong!')}
                })
              })
            }
          })
        }
      })
    })
  }


  // res.end(archive.paths.list);
};
