import 'isomorphic-fetch'
import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { syncHistoryWithStore } from 'react-router-redux'
import { Router, hashHistory } from 'react-router'

export default (store = {}, routes = {}, reducers = {}) => {
  global.React = React
  const history = syncHistoryWithStore(hashHistory, store)
  render(
    <Provider store={store}>
      <Router history={history}>
        {routes}
      </Router>
    </Provider>,
    document.getElementById('root')
  )

  if (process.env.NODE_ENV === 'development') {
    const devTool = require('./utils/openDevTool')
    devTool.default(store)
  }
}
