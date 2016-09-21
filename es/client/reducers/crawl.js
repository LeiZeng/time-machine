import { handleActions } from 'redux-actions'

import {
  CRAWL_START,
  CRAWL_STARTED,
  CRAWL_REPORT,
  CRAWL_REPORTS_RECIEVE
} from '../../constants/crawl'

const crawlReducer = handleActions({
  [CRAWL_START]: (state, action) => ({
    ...state,
    status: CRAWL_START,
    options: { site: action.payload }
  }),
  [CRAWL_STARTED]: (state, action) => ({
    ...state,
    status: CRAWL_STARTED,
    id: action.payload.id
  }),
  [CRAWL_REPORT]: (state, action) => ({
    ...state,
    status: CRAWL_REPORT,
    report: action.payload.urls
  }),
  [CRAWL_REPORTS_RECIEVE]: (state, action) => ({
    ...state,
    reportsList: action.payload
  })
}, {
  status: null,
  id: null,
  options: {},
  report: {},
  reportsList: []
})

export default crawlReducer
