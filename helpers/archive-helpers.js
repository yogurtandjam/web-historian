var fs = require('fs');
var path = require('path');
var _ = require('underscore');
var fetcher = require('../workers/htmlfetcher');
/*
 * You will need to reuse the same paths many times over in the course of this sprint.
 * Consider using the `paths` object below to store frequently used file paths. This way,
 * if you move any files, you'll only need to change your code in one place! Feel free to
 * customize it in any way you wish.
 */

exports.paths = {
  siteAssets: path.join(__dirname, '../web/public'),
  archivedSites: path.join(__dirname, '../archives/sites'),
  list: path.join(__dirname, '../archives/sites.txt')
};

// Used for stubbing paths for tests, do not modify
exports.initialize = function(pathsObj) {
  _.each(pathsObj, function(path, type) {
    exports.paths[type] = path;
  });
};

// The following function names are provided to you to suggest how you might
// modularize your code. Keep it clean!

exports.readListOfUrls = function(callback) {
  fs.readFile(exports.paths.list, 'utf8', (err, data) => {
    if (err) {
      callback(null, err);
    } else {
      if (data) {
        var result = data.split('\n');
        callback(result);
      } else {
        console.log(err, '------------');
        callback([], null);
      }
    }
  });
};

exports.isUrlInList = function(url, callback) {
  exports.readListOfUrls(function(urls, err) {
    if (err) {
      callback(null, err);
    } else {
      callback(urls.includes(url), null);
    }
  });
};


exports.addUrlToList = function(url, callback) {
  fs.appendFile(exports.paths.list, `${url}\n`, (err)=>{
    if (err) { throw err; }
    callback();
  });
};

exports.isUrlArchived = function(url, callback) {
  fs.readdir(exports.paths.archivedSites, 'utf8', (err, data) => {
    if (err) { throw err; } else {
      console.log('isUrlArchived is reading for this, yo ', url.slice(8));
      callback(data.includes(url.slice(8)));
    }
  }); 
};

exports.downloadUrls = function(urls, content) {
  // console.log('------------------- this is urls',urls)
  if (typeof urls === 'object') {
    urls.forEach(function(url) {
      fs.writeFileSync(exports.paths.archivedSites + '/' + url.slice(8), content);
    });
  } else {
    // console.log(exports.paths.archivedSites + '/'+ urls)
    fs.writeFileSync(exports.paths.archivedSites + '/' + urls.slice(8), content);
  }
  // urls.forEach(function(url) {
  //   exports.isUrlArchived(url, function(isFound) {
  //     if (!isFound) {
  //       fetcher.fetch(url)
  //     }
  //   })
  // })
};
