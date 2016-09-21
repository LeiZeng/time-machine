import path from 'path'
import Promise from 'bluebird'
import gm from 'gm'
import capture from './capture'

const diffFiles = (picA, picB, output) => {
  const cwd = process.cwd()

  return new Promise(function (res, rej) {
    gm.compare(
      path.join(cwd, picA),
      path.join(cwd, picB),
      {
        file: path.join(cwd, output),
        highlightColor: 'red',
        tolerance: 1.2
      },
      function (err, isEqual, equality, raw, from, to) {
        if (err) {
          return rej(err)
        }
        res({
          isEqual: isEqual,
          equality: equality,
          from: from,
          to: to
        })
    })
  })
}

const diffUrls = (urlA, urlB) => {
  return Promise.all(
    [urlA, urlB].map(function (url) {
      return capture({
        url: url
      })
    })
  ).then(console.log)
}

export default (urlA, urlB, output) => {
  if(output) {
    return diffFiles(urlA, urlB, output)
  }

  return diffUrls(urlA, urlB)
}
