import socketio from 'socket.io-client'

import { addCrawChannel } from '../actions/crawl'

let socket

class EventQueue {
  emit(...args) {
    if (socket.connected) {
      socket.emit(...args)
    } else {
      setTimeout(() => this.emit(...args), 500)
    }
    return this
  }
  on(...args) {
    if (socket.connected) {
      socket.on(...args)
    } else {
      setTimeout(() => this.on(...args), 500)
    }
    return this
  }
}
export const connect = () => {
  socket = socketio(`ws://${global.location.host}`)
  socket.on('connect', () => {
    addCrawChannel(socket)
  })
  socket.on('event', (event) => {
    console.log('event:', event)
  })
  socket.on('disconnect', () => {
    console.log('disconnect')
  })
}

export const getSocket = () => socket || new EventQueue()
