import { getDB } from '../db'

export default class Reports {
  init({ type }) {
    return new Promise((res, rej) => {
      getDB().find({ type }, (err, docs) => {
        if (err) {
          return rej(err)
        }
        res(docs)
      })
    })
  }
}
