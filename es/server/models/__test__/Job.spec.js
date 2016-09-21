import { expect } from 'chai'

import { initDB, getDB } from '../../db'
import Job from '../Job'

const fakeJob = {
  options: { site: 'localhost' },
  id: new Date().getTime()
}
const createFakeJob = (callback) => getDB().insert(fakeJob, callback)

before(() => {
  initDB('test.db')
})
afterEach(done => getDB().remove({}, { multi: true }, done))

describe('Job Model', () => {
  it('expect database initialised', () => {
    expect(getDB()).to.be.exists
  })
  it('expect to be create', done => {
    const job = new Job()
    job
    .create({site: 'localhost'})
    .then(doc => {
      expect(doc.options).to.be.exists
      expect(doc.options.site).to.be.equal('localhost')
      done()
    })
  })
  it('expect to be init', () => {
    const job = new Job()
    job.init(fakeJob)
    expect(job.options).to.be.exists
    expect(job.options.site).to.be.equal('localhost')
  })
  it('expect to be updated', done => {
    createFakeJob((err, doc) => {
      const job = new Job()
      job.init(doc)
      job.options.site = 'testsite'
      job.save()
      .then(() => {
        getDB().findOne({ _id: job._id }, (err, newDoc) => {
          expect(newDoc.options.site).to.be.equal('testsite')
          done()
        })
      })
    })
  })
})
