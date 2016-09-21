import {
  CAPTURE_START,
  CAPTURE_STARTED,
  CAPTURE_REPORT
} from '../../constants/capture'
import { getSocket } from '../utils/socketio'

let socketio = getSocket()
let captureDispatch = null

export const crawlStart = (crawlId) => (dispatch) => {
  socketio.emit(CAPTURE_START, { crawlId })
  captureDispatch = dispatch
  captureDispatch({
    type: CAPTURE_START,
    payload: crawlId
  })
}
export const addCrawChannel = (socket) => {
  socketio = socket
  socketio
  .on(CAPTURE_STARTED, (info) => {
    captureDispatch({
      type: CAPTURE_STARTED,
      payload: info
    })
  })
  .on(CAPTURE_REPORT, (report) => {
    captureDispatch({
      type: CAPTURE_REPORT,
      payload: report
    })
  })
}
