import {
  CRAWL_START,
  CRAWL_STARTED,
  CRAWL_REPORT,
  CRAWL_REPORTS_FETCH,
  CRAWL_REPORTS_RECIEVE
} from '../../constants/crawl'
import { getSocket } from '../utils/socketio'

let socketio = getSocket()
let crawlDispatch = null

export const crawlReports = () => (dispatch) => {
  crawlDispatch = dispatch
  socketio.emit(CRAWL_REPORTS_FETCH)
  crawlDispatch({
    type: CRAWL_REPORTS_FETCH
  })
}
export const crawlStart = (site) => (dispatch) => {
  socketio.emit(CRAWL_START, { site })
  crawlDispatch = dispatch
  crawlDispatch({
    type: CRAWL_START,
    payload: site
  })
}
export const addCrawChannel = (socket) => {
  socketio = socket
  socketio
  .on(CRAWL_STARTED, (info) => {
    crawlDispatch({
      type: CRAWL_STARTED,
      payload: info
    })
  })
  .on(CRAWL_REPORT, (report) => {
    crawlDispatch({
      type: CRAWL_REPORT,
      payload: report
    })
  })
  .on(CRAWL_REPORTS_RECIEVE, (reports) => {
    crawlDispatch({
      type: CRAWL_REPORTS_RECIEVE,
      payload: reports
    })
  })
}
