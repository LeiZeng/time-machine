import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import {
  Layout,
  List,
  Card,
  Cell,
  Grid
} from 'react-mdl'

import { captureStart } from '../../../actions/capture'

const CapturePage = ({ actions, captureJob }) => (
  <Layout>
    <Grid noSpacing>
      <Cell col={12} align="stretch"><h2>Capture</h2></Cell>
    </Grid>
    <Grid noSpacing>
      <Cell col={12} align="stretch">
        <List>
          <div>{captureJob.id}</div>
          <div>{captureJob.status}</div>
        </List>
      </Cell>
      <Cell col={12} align="stretch">
        {captureJob.report && captureJob.report.length
          ? <List>{captureJob.report.map((url, i) => <Card key={i}>{url}</Card>)}</List>
          : 'No report yet.'
        }
      </Cell>
    </Grid>
  </Layout>
)
CapturePage.propTypes = {
  captureJob: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired
}
const mapState = state => ({
  captureJob: state.captureJob
})
const mapAction = dispatch => ({
  actions: bindActionCreators({ captureStart }, dispatch)
})
export default connect(mapState, mapAction)(CapturePage)
