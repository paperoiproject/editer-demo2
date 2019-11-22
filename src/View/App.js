import React from 'react';
import { Router, Route, Switch, Redirect, BrowserRouter} from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import TabBar from './components/TabBar';
import ScenarioList from './components/ScenarioList';
import TimeTable from './components/TimeTable';

const useStyles = makeStyles({
  App: {
    textAlign: "center",
    paddingTop: "8vh",
    display: "flex",
    justifyContent: "center",
  },
});

function App() {
  const classes = useStyles();
  return (
    <div className={classes.App}>
      <BrowserRouter>
        <TabBar />
        <Switch>
          <Route exact path='/' component={ScenarioList} />
          <Route exact path='/timetable' component={TimeTable} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
