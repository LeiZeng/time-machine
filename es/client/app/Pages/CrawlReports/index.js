import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import {
  Layout,
  List,
  ListItem,
  Cell,
  Grid
} from 'react-mdl'

import { crawlReports } from '../../../actions/crawl'

class CrawlReportsPage extends Component {
  static propTypes = {
    reportsList: PropTypes.array.isRequired,
    actions: PropTypes.object.isRequired
  }
  componentDidMount() {
    this.props.actions.crawlReports()
  }
  render() {
    const { reportsList } = this.props
    return (
      <Layout>
        <Grid noSpacing>
          <Cell col={12} align="stretch"><h2>Crawl Reports</h2></Cell>
        </Grid>
        <Grid noSpacing>
          <Cell col={12} align="stretch">
            {reportsList.length
              ? <List>{reportsList.map(
                ({ options }, i) => (
                  <ListItem key={i}>
                    <div>{new Date(options.id).toString()}</div>
                    <div>{options.site}</div>
                  </ListItem>
                )
              )}</List>
              : 'No report yet.'
            }
          </Cell>
        </Grid>
      </Layout>
    )
  }
}
const mapState = state => ({
  reportsList: state.crawl.reportsList
})
const mapAction = dispatch => ({
  actions: bindActionCreators({ crawlReports }, dispatch)
})
export default connect(mapState, mapAction)(CrawlReportsPage)
