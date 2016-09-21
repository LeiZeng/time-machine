import http from 'http'
import express from 'express'

import { initDB } from './db'
import { connect } from './socket'

const app = express()
app.use(express.static('public'))
app.use('/mocks', express.static('es/mocks/public'))

if(process.env.NODE_ENV === 'development') {
  app.use(require('./client').default)
}

const server = http.createServer(app)

initDB()
connect(server)

server.listen(9999, () => console.log('server start at 9999'))
