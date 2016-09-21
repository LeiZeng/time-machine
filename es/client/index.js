import 'babel-polyfill'
import { hashHistory } from 'react-router'

import base from './base'
import configureStore from './store/configureStore'
import routes from './routes'
import reducers from './reducers'
import { connect } from './utils/socketio'

import './style/reset.css'
import './style/index.css'

connect()

const state = {}
const initialState = Object.assign(state, global.INITIAL_STATE || {})
const store = configureStore(initialState, reducers, hashHistory)


if (module.hot) {
  module.hot.accept(
    './reducers',
    () => store.replaceReducer(reducers)
  )
}
base(store, routes)
