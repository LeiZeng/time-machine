import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import {
  Layout,
  List,
  ListItem,
  Cell,
  Grid
} from 'react-mdl'

import { crawlStart } from '../../../actions/crawl'
import CrawlForm from './form'

const CrawlPage = ({ actions, crawlJob }) => (
  <Layout>
    <Grid noSpacing>
      <Cell col={12} align="stretch"><h2>Crawl</h2></Cell>
    </Grid>
    <CrawlForm onSubmit={(values) => actions.crawlStart(values.site)} />
    <Grid noSpacing>
      <Cell col={12} align="stretch">
        <List>
          <div>{crawlJob.id}</div>
          <div>{crawlJob.status}</div>
        </List>
      </Cell>
      <Cell col={12} align="stretch">
        {crawlJob.report && crawlJob.report.length
          ? <List>{crawlJob.report.map((url, i) => <ListItem key={i}>{url}</ListItem>)}</List>
          : 'No report yet.'
        }
      </Cell>
    </Grid>
  </Layout>
)
CrawlPage.propTypes = {
  crawlJob: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired
}
const mapState = state => ({
  crawlJob: state.crawl
})
const mapAction = dispatch => ({
  actions: bindActionCreators({ crawlStart }, dispatch)
})
export default connect(mapState, mapAction)(CrawlPage)
