module.exports = (callback) => {
  setTimeout(() => {
    callback('#' + process.pid)
  }, 1000)
}
