import React from 'react';
import { Link } from 'react-router-dom'

import {AppBar, Tabs, Tab} from "@material-ui/core";

import { withRouter } from 'react-router-dom'

function TabBar(props){
  return (
    <AppBar position="fixed" color='primary'>
        <Tabs variant="fullWidth" value={props.history.location.pathname}>
          <Tab value="/scenarioList" component={Link} to="/scenarioList" label="シナリオ一覧"/>
          <Tab value="/timeTable" component={Link} to="/timeTable" label="タイムテーブル"/>
        </Tabs>
    </AppBar>
  )
}

export default withRouter(TabBar)
