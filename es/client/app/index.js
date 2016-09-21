import React, { PropTypes } from 'react'

import {
  Layout
} from 'react-mdl'

import Header from './components/Header'
import Main from './components/Main'

const App = props => (
  <Layout fixedHeader>
    <Header />
    <Main>{props.children}</Main>
  </Layout>
)

App.propTypes = {
  children: PropTypes.node.isRequired
}

export default App
