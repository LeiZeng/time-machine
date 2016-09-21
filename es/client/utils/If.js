import React, {
  Component,
  PropTypes
} from 'react'

class If extends Component {
  static propTypes = {
    test: PropTypes.bool.isRequired,
    children: PropTypes.node
  };
  render() {
    if (this.props.test) {
      return <div>{this.props.children}</div>
    }
    return false
  }
}

export default If
