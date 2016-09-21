import { expect } from 'chai'

import crawl from '../crawl'
import { start, site } from '../../mocks/mockServer'

before(start)

describe.only('Crawl', () => {
  it('should get urls list', done => {
    crawl({
      site: site
    }).then((urls) => {
      expect(urls).to.be.exists
      expect(urls.length).to.be.equal(8)
      done()
    })
    .catch(console.log)
  })
})
