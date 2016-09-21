import React, { PropTypes } from 'react'
import { Link } from 'react-router'

import {
  Content,
  List,
  ListItem,
  Cell,
  Grid
} from 'react-mdl'

const Main = props => (
  <Content className="mdl-color-text--grey-600 mdl-color--grey-50">
    <Grid noSpacing>
      <Cell col={12}>
        <Grid noSpacing>
          <Cell col={2} tablet={12} component={'aside'} className="sidebar-components mdl-shadow--4dp">
            <List>
              <ListItem><Link to="/">Home</Link></ListItem>
              <ListItem><Link to="/crawl">Crawl</Link></ListItem>
              <ListItem><Link to="/crawl-reports">Crawl Reports</Link></ListItem>
              <ListItem><Link to="/capture">Capture</Link></ListItem>
            </List>
          </Cell>
          <Cell col={10}>{props.children}</Cell>
        </Grid>
      </Cell>
    </Grid>
  </Content>
)

Main.propTypes = {
  children: PropTypes.node.isRequired
}

export default Main
