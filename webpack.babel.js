import path from 'path'
import webpack from 'webpack'
import autoprefixer from 'autoprefixer'
import ExtractTextPlugin from 'extract-text-webpack-plugin'

const baseConfig = {
  target: 'web',
  cache: true,
  entry: {
    vendor: [
      "babel-polyfill",
      "isomorphic-fetch",
      "socket.io-client",
      "react",
      "react-dom",
      "react-router",
      "react-router-redux",
      "redux",
      "redux-promise",
      "redux-thunk"
    ],
    app: ['./es/client/index.js']
  },
  module: {
    loaders: [{
      test: /\.jsx?$/,
      loaders: ['react-hot', 'babel?cacheDirectory', 'eslint'],
      exclude: /node_modules/
    }, {
      test: /\.css$/,
      loader: ExtractTextPlugin.extract(
        'style-loader',
        'css-loader'
      ),
      exclude: /node_modules/
    }]
  },
  output: {
    path: path.join(__dirname, 'public'),
    filename: '[name].js',
    pathInfo: false
  },
  resolve: {
    alias: {},
    extensions: ['', '.js', '.jsx'],
    packageMains: ['webpack', 'browser', 'web', 'browserify', ['jam', 'main'], 'main']
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin({ name: 'common', filename: 'common.js' }),
    new ExtractTextPlugin('[name].css'),
    new webpack.DefinePlugin({
      'process.env': { NODE_ENV: JSON.stringify(process.env.NODE_ENV || 'development') }
    })
  ],
  postcss() {
    return [autoprefixer({ browsers: ['> 5%'] })]
  }
}
const config = Object.assign({}, baseConfig)

if (process.env.NODE_ENV === 'development') {
  config.debug = true
  config.devtool = 'cheap-module-eval-source-map'
  config.plugins.push(
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.DefinePlugin({
      __DEV__: true,
      'process.env': {
        NODE_ENV: JSON.stringify('development')
      }
    })
  )
  config.devServer = {
    contentBase: './public',
    publicPath: '/',
    headers: {
      'Access-Control-Allow-Origin': '*'
    },
    hot: false,
    historyApiFallback: true,
    watchOptions: {
      aggregateTimeout: 300,
      poll: 1000
    },
    noInfo: false
  }
} else {
  config.plugins.push(
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.DefinePlugin({
      __DEV__: false,
      'process.env': {
        NODE_ENV: JSON.stringify('production')
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      compressor: {
        warnings: false
      }
    })
  )
}

export default config
