import webpack from 'webpack'
import webpackDevMiddleware from "webpack-dev-middleware"

import webpackConfig from '../../webpack.babel'

const compiler = webpack(webpackConfig)
const server = webpackDevMiddleware(compiler, {
  contentBase: "public",
  hot: true,
  historyApiFallback: false,
  compress: true,
  quiet: false,
  noInfo: true,
  watchOptions: {
    aggregateTimeout: 300,
    poll: 1000
  },
  publicPath: "/",
  stats: { colors: true }
})

export default server
