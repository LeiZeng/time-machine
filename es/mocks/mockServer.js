import mockServer from './baseServer'

const defaultPort = 3117
let mockApp

export const start = (done, port = defaultPort) => {
  if (!!mockApp) {
    process.nextTick(done)
  } else {
    mockApp = mockServer.listen(port, done)
  }
}

export const site = `http://localhost:${defaultPort}`
