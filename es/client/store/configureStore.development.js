import { createStore, applyMiddleware, compose } from 'redux'
import { persistState } from 'redux-devtools'
import { routerMiddleware } from 'react-router-redux'
import thunk from 'redux-thunk'
import promise from 'redux-promise'
import DevTools from '../utils/DevTools'

export default function configureStore(initialState, rootReducer, history) {
  const store = compose(
    applyMiddleware(
      routerMiddleware(history),
      thunk,
      promise
    ),
    DevTools.instrument(),
    persistState(getDebugSessionKey())
  )(createStore)(rootReducer, initialState)

  return store
}

function getDebugSessionKey() {
  return global.location.href.match(
        /[?&]debug_session=([^&]+)\b/
      )
}
