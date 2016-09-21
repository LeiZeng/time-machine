require('events').EventEmitter.defaultMaxListeners = Infinity
// Prevent the warnning: https://github.com/sindresorhus/pageres/issues/178

import path from 'path'
import Crawler from 'simplecrawler'
import uri from 'urijs'

// TODO wait for simplecrawler 1.0 release, this is the fix for https
Crawler.prototype.processURL = function(URL, context) {
    var newURL,
        crawler = this;

    if (!context || typeof context !== "object") {
        context = {
            url: crawler.initialProtocol + "://" +
                crawler.host + ":" +
                crawler.initialPort + "/",
            depth: QUEUE_ITEM_INITIAL_DEPTH
        };
    }

    // If the URL didn't contain anything, don't fetch it.
    if (!(URL && URL.replace(/\s+/ig, "").length)) {
        return false;
    }

    // Check if querystring should be ignored
    if (crawler.stripQuerystring === true) {
        URL = crawler.removeQuerystring(URL);
    }

    if (crawler.stripWWWDomain && URL.match(/https?\:\/\/(www\.).*/i)) {
        URL = URL.replace("www.", "");
    }

    try {
        newURL =
            uri(URL)
                .absoluteTo(context.url)
                .normalize();

        if (crawler.urlEncoding === "iso8859") {
            newURL = newURL.iso8859();
        }

    } catch (e) {
        // Couldn't process the URL, since urijs choked on it.
        return false;
    }

    // simplecrawler uses slightly different terminology to urijs. Sorry!
    return {
        protocol: newURL.protocol() || "http",
        host:     newURL.hostname(),
        port:     newURL.port() || crawler.initialPort,
        path:     newURL.resource(),
        uriPath:  newURL.path(),
        depth:    context.depth + 1
    };
}

export default (options) => {
  const protocal = options.protocal || 'http://'
  const host = options.host || 'locahost'
  const port = options.port || 3000
  const proxy = options.proxy
  const maxDepth = options.maxDepth || 4
  const site = new uri(options.site || (protocal + host + ':' + port))

  return new Promise((res, rej) => {
    const crawler = new Crawler(site.hostname())
    const urls = []

    crawler.initialProtocol = site.protocol()
    crawler.initialPort = site.port()
      || (site.protocol() === 'http' ? 80 : null)
      || (site.protocol() === 'https' ? 443 : null)
      || 80
    crawler.initialPath = site.path()
    crawler.interval = 500
    crawler.ignoreInvalidSSL = true
    crawler.parseHTMLComments = true
    crawler.parseScriptTags = true
    crawler.downloadUnsupported = false
    crawler.maxDepth = 0
    crawler.ignoreInvalidSSL = true
    crawler.timeout = 10000

    if (proxy) {
      const proxyInfo = proxy.match(/^(\w+\:\/\/)?(([^\:]+)\:([^\@]+)\@)?([^\:\/]+)\:(\d+)$/)
      crawler.useProxy = true
      crawler.proxyHostname = proxyInfo[5]
      crawler.proxyPort = Number(proxyInfo[6], 10)
      crawler.proxyUser = proxyInfo[3]
      crawler.proxyPass = proxyInfo[4]
    }

    crawler.addFetchCondition((parsedURL, queueItem) => {
      return /\/[^\/\.]*(\.html)?(\/)?(\?.*)?$/i.test(parsedURL.path) && !urls.find(url => url === parsedURL.path)
    })

    crawler
    .on('crawlstart', (queueItem, options) => {
      console.log('Start Crawling: ', site.href())
    })
    .on('fetchredirect', (queueItem, parsedURL, response) => {
      console.log('Redirect found: ', queueItem.url)
      if (response.headers.location.indexOf(parsedURL.host)) {
        console.log('Using Redirected: ', response.headers.location)
      }
    })
    .on('fetchdisallowed', (queueItem) => {
      console.log('Fetch disallowed: ', queueItem.url)
    })
    .on('fetchheaders', (queueItem, response) => {
      if (response.statusCode < 300 && response.statusCode >= 200) {
        console.log('Crawled header: ', queueItem.path)
      } else {
        console.log('Header redirected', queueItem.path)
      }
    })
    .on('fetchcomplete', (queueItem) => {
      console.log('Fetch complete:', queueItem.path)
      urls.push(queueItem.path)
    })
    .on('complete', () => {
      console.log('Finish crawling.', urls)
      res(urls)
    })
    .on('discoverycomplete', (error, list) => {
      console.log('discoverycomplete', list.length)
    })

    // Errors
    .on('fetcherror', (queueItem, response) => {
      console.log('Error:', queueItem.url, response.status)
    })
    .on('fetchtimeout', (queueItem, crawlerTimeoutValue) => {
      console.log('Timeout:', queueItem.url)
    })
    .on('fetchclienterror', (queueItem, error) => {
      console.log('Fetch client error:', queueItem.url, error)
    })
    .on('queueerror', (queueItem, error) => {
      console.log('Queue error:', queueItem.url, error)
    })
    .on('cookieerror', (queueItem, error) => {
      console.log('Cookie error:', queueItem.url, error)
    })
    .on('fetchdataerror', (queueItem, response) => {
      console.log('Fetch Data error:', queueItem.url, response.status)
    })
    .on('robotstxterror', (error) => {
      console.log('robotstxterror:', error.message)
    })
    .start()
  })
}
