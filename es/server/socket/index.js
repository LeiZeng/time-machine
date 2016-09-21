import socketio from 'socket.io'

import crawlChannel from '../channels/crawl'

let io

export const connect = (server) => {
  io = socketio(server)

  io.on('connection', (socket) => {
    console.log('io connection id:', socket.id)
    crawlChannel(socket)
  })

  return io
}

export const getIO = () => io
