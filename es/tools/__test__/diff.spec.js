import { expect } from 'chai'

import diff from '../diff'

describe('Diff', () => {
  it('should get urls list', done => {
    diff(
      'public/snapshot/a.png',
      'public/snapshot/b.png',
      'public/diff/diff.png'
    ).then((diffinfo) => {
      expect(diffinfo).to.be.exists
      done()
    })
  })
})
