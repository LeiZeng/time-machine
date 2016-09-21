import { crawl } from '../worker'
import Crawl from '../models/Crawl'
import Reports from '../models/Reports'
import {
  CRAWL_START,
  CRAWL_STARTED,
  CRAWL_REPORT,
  CRAWL_REPORTS_FETCH,
  CRAWL_REPORTS_RECIEVE
} from '../../constants/crawl'

export default (socket) => {
  socket
  .on(CRAWL_START, ({ site = 'http://localhost:9999/index.html' }) => {
    const crawlJob = new Crawl()
    crawlJob.create({ site })
    .then(() => {
      socket.emit(CRAWL_STARTED, crawlJob)
      crawl(site, (urls) => {
        crawlJob.report = { urls }
        crawlJob.save()
        .then(() => socket.emit(CRAWL_REPORT, { urls }))
      })
    })
  })
  .on(CRAWL_REPORTS_FETCH, () => {
    const reports = new Reports()
    reports.init({ type: 'Crawl'})
    .then(list => {
      socket.emit(CRAWL_REPORTS_RECIEVE, list)
    })
  })
}
