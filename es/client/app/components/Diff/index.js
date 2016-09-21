import React, { PropTypes } from 'react'
import { Card } from 'react-mdl'

const Diff = props => (
  <Card>
    <img src={props.from} alt="from" />
    <img src={props.diff} alt="diff" />
    <img src={props.to} alt="to" />
  </Card>
)

Diff.propTypes = {
  from: PropTypes.string.isRequired,
  to: PropTypes.string.isRequired,
  diff: PropTypes.string.isRequired
}

export default Diff
