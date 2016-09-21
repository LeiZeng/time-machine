import fs from 'fs'
import path from 'path'
import moment from 'moment'
import { expect } from 'chai'

import capture from '../capture'
import { start, site } from '../../mocks/mockServer'

before(start)

describe('Capture', () => {
  it('should capture the target page', done => {
    capture({
      url: `${site}/sub.html`
    }).then((snapshot) => {
      expect(snapshot).to.be.exists
      expect(fs.statSync(path.join(process.cwd(), snapshot))).to.be.exists
      done()
    })
  })
  it('should capture the target page with timestamp', done => {
    const currentTime = moment().format('YY-MM-DD_HH-MM-SS')
    capture({
      url: 'http://localhost:3117/sub.html',
      timestamp: currentTime
    }).then((snapshot) => {
      expect(snapshot).to.be.exists
      expect(fs.statSync(path.join(process.cwd(), snapshot))).to.be.exists
      done()
    })
  })
})
