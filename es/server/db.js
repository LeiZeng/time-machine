import Datastore from 'nedb'

let db

export const initDB = (filename = 'data.db') => {
  db = new Datastore({
    filename: filename,
    autoload: true
  })
  db.loadDatabase()
}

export const getDB = () => db
