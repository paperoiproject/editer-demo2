import React, { useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { makeStyles } from '@material-ui/core/styles';

import green from '@material-ui/core/colors/green'

import MaterialTable, { MTableBodyRow, MTableHeader, MTableBody}  from 'material-table';
import TablePagination from '@material-ui/core/TablePagination';

import TableRow from '@material-ui/core/TableRow';
import TableFooter from '@material-ui/core/TableFooter';

import Toggleon from "@material-ui/icons/ToggleOn";
import Toggleoff from "@material-ui/icons/ToggleOff";
import Typography from "@material-ui/core/Typography";


import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import CommentIcon from '@material-ui/icons/Comment';
import DeleteIcon from "@material-ui/icons/Delete";
import AddIcon from "@material-ui/icons/Add";

import LocationOnIcon from "@material-ui/icons/LocationOn";
import FlagIcon from "@material-ui/icons/Flag";
import ForwardIcon from "@material-ui/icons/Forward";

import Paper from '@material-ui/core/Paper';


import { Container, Draggable } from 'react-smooth-dnd';


const useStyles = makeStyles({
  root: {
    width: "60vw",
    hight: "70vh"
  },
  header: {
    display: "flex",
    paddingTop: 15,
  },
  TablePagination: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: 10
  },
});

function TimeTable() {
  const classes = useStyles();
  const [state, setState] = React.useState({
    columns: [
      { title: 'シナリオ名', field: 'name' },
      { title: '作成日', field: 'day', type: 'numeric'},
      {
        title: '動作数',
        field: 'num',
        type: 'numeric'
      },
    ],
    time: ["a", "b", "c"],
    power: false,
    point: 0,
    next_point: 1,
    chmove: false,
    searchFlag: false,
    showFlag: false,
    showTarget: {name: "load", num: 0}
  });
  console.log(state.time)

  function iconMove(i){
      if(state.point === i){
        return (<FlagIcon color={(state.power)? "primary": ""}/>)
      }
      else if(state.next_point === i){
        return (<ForwardIcon color={(state.power)? "primary": ""}/>)
      }
      else {
        return ""
      }
  }
  
  return (
    <div className={classes.root}>
    <Paper className={classes.root}>
    <div className={classes.header}>
    <Typography variant="h6" style={{width: "15vw"}}>
      タイムテーブル
    </Typography>
    <IconButton edge="end" aria-label="Comments" style={{marginLeft: "36vw", marginRight: "1vw"}} onClick={()=>{setState({ ...state, searchFlag: true})}}>
      <AddIcon />
    </IconButton>
    <IconButton edge="end" aria-label="Comments"
      onClick={()=>{
        if(state.power){
          setState({ ...state, power: false})
        } else {
          setState({ ...state, power: true})
        }
      }}>
      {(state.power)? <Toggleon htmlColor={green[500]}/> : <Toggleoff />}
    </IconButton>
    </div>
    <List>
    <Container>
      {state.time.map((value, i) => {
        const labelId = `checkbox-list-label-${value}`;
        return (
          <Draggable >
          <ListItem key={value} dense button divider
            onClick={()=>{setState({ ...state, showTarget: {name: value, num: i}, showFlag: true})}}>
            <ListItemIcon>
            <IconButton edge="end" aria-label="Comments" onClick={(e)=>{
              e.stopPropagation()
              let ctime = state.time.slice()
              ctime.splice(i, 1);
              setState({...state, time: ctime});}}>
              <DeleteIcon/>
            </IconButton>
            </ListItemIcon>
            <ListItemText id={labelId} primary={`${value}`} />
            <ListItemSecondaryAction>
              {iconMove(i)}
            </ListItemSecondaryAction>
          </ListItem>
          </Draggable >
        );
      })}
    </Container>
    </List>
    </Paper>
    </div>
  );
}
export default TimeTable