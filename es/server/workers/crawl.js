import crawl from '../../tools/crawl'

module.exports = (site, callback) => {
  crawl({
    site: site
  }).then(callback)
}
