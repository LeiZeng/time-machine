import React from 'react'
import { Route, IndexRoute } from 'react-router'

import App from './app'

import Home from './app/Pages/Home'
import Diff from './app/Pages/Diff'
import ReportsPage from './app/Pages/Reports'
import CrawlPage from './app/Pages/Crawl'
import CrawlReportsPage from './app/Pages/CrawlReports'
import CapturePage from './app/Pages/Capture'
import DiffReportsPage from './app/Pages/DiffReports'

export default (
  <Route path="/" component={App}>
    <IndexRoute component={Home} />
    <Route path="diff" component={Diff} />
    <Route path="reports" component={ReportsPage} />
    <Route path="crawl" component={CrawlPage} />
    <Route path="crawl-reports" component={CrawlReportsPage} />
    <Route path="capture" component={CapturePage} />
    <Route path="diff-reports" component={DiffReportsPage} />
    <Route path="*" component={Home} />
  </Route>
)
