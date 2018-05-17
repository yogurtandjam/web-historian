// Use the code in `archive-helpers.js` to actually download the urls
// that are waiting.
var http = require('http');

exports.fetch = function(url, res) {
  http.get(url, (res) => {
    res.setEncoding('utf8');
    let rawData = '';
    res.on('data', (chunk) => {rawData += chunk});
    res.on('end', () => {
      var finalData = JSON.parse(rawData)
    })
  })
}