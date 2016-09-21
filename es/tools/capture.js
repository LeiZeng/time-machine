import path from 'path'
import uri from 'urijs'
import Pageres from 'pageres'
import colors from 'colors'

export default (options = {}) => {
  const url = uri(options.url)
  const cwd = process.cwd()
  const root = options.root || 'public'
  const output = options.output || 'capture'
  const timestamp = options.timestamp || new Date().getTime()

  const site = url.port() !== 80 ? [url.hostname(), url.port()].join(':') : url.hostname()
  const destPath = path.join(cwd, root, output, site, url.pathname().split('/').join(path.sep))
  const size = options.size || '1024x1000'

  console.log('Start capture: ', colors.cyan(url.pathname()))

  return new Pageres({
      delay: 1,
      filename: timestamp ? [timestamp, size].join('__') : '<%= date %>__<%= time %>__<%= size %>'
    })
    .src(url.toString(), [size])
    .dest(destPath)
    .run()
    .then((file) => {
      var filename = file[0].filename
      var filepath = path.relative(cwd, path.join(destPath, file[0].filename))
      console.log('Finish captured: ', colors.green(filepath))
      return Promise.resolve(filepath)
    })
}
