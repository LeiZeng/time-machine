var Crawler = require('simplecrawler');
var Promise = require('bluebird');

function start(config) {
  var protocal = config.protocal || 'http://';
  var host = config.host;
  var port = config.port || 80;
  var proxy = config.proxy;
  var site = config.site || (protocal + host + ':' + port)

  return new Promise(function (res, rej) {
    var crawler = Crawler.crawl(site || 'https://aami.com.au');
    var urls = [];

    crawler.interval = 500;
    crawler.parseHTMLComments = true;
    crawler.parseScriptTags = true;
    crawler.downloadUnsupported = false;
    crawler.maxDepth = 2;
    crawler.initialPath = '/';

    if (proxy) {
      var proxyInfo = proxy.match(/^(\w+\:\/\/)?(([^\:]+)\:([^\@]+)\@)?([^\:\/]+)\:(\d+)$/);
      crawler.useProxy = true;
      crawler.proxyHostname = proxyInfo[4];
      crawler.proxyPort = proxyInfo[5];
      crawler.proxyUser = proxyInfo[2];
      crawler.proxyPass = proxyInfo[3];
    }

    crawler.addFetchCondition(function(parsedURL, queueItem) {
        return parsedURL.path.match(/[^\/]+(\.html)|(\/)(\?.*)?$/i);
    });

    crawler.on('fetchcomplete', function(queueItem) {
      console.log('Completed: ', queueItem.url);
      urls.push(queueItem.url);
    });

    crawler.on('complete', function () {
      res(urls)
    })
  })
}

module.exports = start
