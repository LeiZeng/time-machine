import { getDB } from '../db'

export default class Job {
  init(doc) {
    const { _id, id, type, options, report } = doc

    this._id = _id
    this.id = id
    this.type = type
    this.options = options
    this.report = report

    return this
  }
  create(options) {
    const { constructor } = this

    this.options = options
    this.options.id = options.id || options.timestamp || new Date().getTime()
    this.type = constructor.name

    return new Promise((res, rej) => {
      getDB().insert({ options, type: constructor.name }, (err, doc) => {
        if (err) {
          return rej(err)
        }
        this.id = this.options.id
        this._id = doc._id
        res(doc)
      })
    })
  }
  save() {
    const { _id, options, report, type } = this

    return new Promise((res, rej) => {
      getDB().update({ _id }, { options, report }, {}, (err, doc) => {
        if (err) {
          return rej(err)
        }
        res(doc)
      })
    })
  }
}
