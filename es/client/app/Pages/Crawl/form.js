import React, { PropTypes } from 'react'
import { reduxForm } from 'redux-form'

import {
  Button,
  Textfield,
  Cell,
  Grid
} from 'react-mdl'

export const fields = ['site']

const CrawlForm = ({ fields: { site }, handleSubmit }) => (
  <Grid>
    <Cell col={12}>
      <label>Target Site:</label>
      <Textfield label="http://site" required pattern="https?://.*" {...site} />
    </Cell>
    <Cell col={12}>
      <Button onClick={handleSubmit}>Start</Button>
    </Cell>
  </Grid>
)

CrawlForm.propTypes = {
  fields: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func.isRequired
}

export default reduxForm({
  form: 'crawl',
  fields
})(CrawlForm)
