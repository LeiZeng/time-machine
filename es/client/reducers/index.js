import { combineReducers } from 'redux'
import { routerReducer as routing } from 'react-router-redux'
import { reducer as formReducer } from 'redux-form'

import crawl from './crawl'

const rootReducer = combineReducers({
  routing,
  crawl,
  form: formReducer
})

export default rootReducer
