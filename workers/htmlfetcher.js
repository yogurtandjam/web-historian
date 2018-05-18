// Use the code in `archive-helpers.js` to actually download the urls
// that are waiting.
var http = require('http');

exports.fetch = function(url, res) {
  //ifurlisinlist && is not archived
  //download and archive it
  http.get(url, (res) => {
    res.setEncoding('utf8');
    let rawData = '';
    res.on('data', (chunk) => {
      console.log('im chunking', chunk);
      rawData += chunk;
    });
    res.on('error', (err) => {
      console.log('err', err);
    });
    res.on('end', (data) => {
      console.log('complete', data);
      archive.downloadUrls(url, rawData);
    });
  });
};
