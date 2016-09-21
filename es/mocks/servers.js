import { start } from './mockServer'

const port = process.argv[2] || 3117
start(() => {
  console.log('start server on localhost:' + port)
}, port)
