import { createStore, applyMiddleware, compose } from 'redux'
import { routerMiddleware } from 'react-router-redux'
import thunk from 'redux-thunk'
import promise from 'redux-promise'

export default function configureStore(initialState, rootReducer, history) {
  const store = compose(
    applyMiddleware(
      routerMiddleware(history),
      thunk,
      promise
    )
  )(createStore)(rootReducer, initialState)
  return store
}
