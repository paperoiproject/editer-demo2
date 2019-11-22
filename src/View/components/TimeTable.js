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
import { applyDrag, applyDrag2, generateItems } from './utils';

import SceneShowDialog from './SceneShowDialog';
import SearchDialog from './SearchDialog';

import {TimeTableLoadAction, TimeTableUpdateAction, TimeTableChangeAction, ScenesLoadAction, PaperoSendAction, PaperoAction} from "../../Store/Action/Actions/goAPI";


const url = "http://localhost:8080/image/get?"
let defo_url =  "http://localhost:8080/image/get?name=defo&num=0";


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
  const dispatch = useDispatch();
  const inputRef = useRef();
  const {timeTable, scenes, sending} = useSelector(state => state.GoReducer);

  useEffect(
    () => {
      dispatch(ScenesLoadAction())
      dispatch(TimeTableLoadAction())
    },
    [inputRef]
  );

  const drop = (e) => {
    let arr = applyDrag(timeTable, e)
    
    let formData = new FormData()
    console.log(arr.length)
    formData.append("timeTableSize", arr.length)
    for(let i = 0; i < arr.length; i++){
      formData.append(`name${i + 1}`, arr[i].name)
    }
    dispatch(TimeTableChangeAction(arr))
    dispatch(TimeTableUpdateAction(formData))
  }

  const makeFormData = (arr) => {
    let formData = new FormData()
    formData.append("timeTableSize", arr.length)
    for(let i = 0; i < arr.length; i++){
      formData.append(`name${i + 1}`, arr[i].name)
    }
    return formData
  }


  const addTimeTable = (name) => {
    let new_arr = timeTable.slice()
    new_arr.push({num: timeTable.length + 1, name: name})
    dispatch(TimeTableChangeAction(new_arr))
    let formData = makeFormData(new_arr)
    dispatch(TimeTableUpdateAction(formData))
  }
  const [state, setState] = React.useState({
    timeTable: timeTable,
    testTimeTable: [
      {num: 1, name: "a"},
      {num: 2, name: "b"},
      {num: 3, name: "c"}
    ],
    testScenes: [
      {name: "a", num: 1, action: "A", text: "あ", image: "a_1"},
      {name: "a", num: 2, action: "B", text: "い", image: ""},
      {name: "b", num: 1, action: "A", text: "あ", image: "b_1"},
      {name: "b", num: 2, action: "B", text: "い", image: "b_2"},
      {name: "b", num: 3, action: "C", text: "う", image: "b_3"},
      {name: "c", num: 1, action: "A", text: "あ", image: ""},
      {name: "c", num: 2, action: "B", text: "い", image: ""},
    ],
    power: false,
    point: 0,
    next_point: 1,
    act_num: 0,
    chmove: false,
    searchFlag: false,
    showFlag: false,
    showTarget: 0
  });
  if(state.power){
    console.log(state.act_num)
    if(!sending){
      let sendPoint = state.next_point;
      if(state.act_num === 0){
        sendPoint = state.point;
      } 
      let tasks = scenes.filter((v)=>{return v.name === timeTable[sendPoint].name})
      let formData = new FormData()
      formData.append("name", timeTable[sendPoint].name)
      formData.append("size", tasks.length);
      for(let i = 0; i < tasks.length; i++){
         formData.append(`act${i + 1}`, tasks[i].action)
         formData.append(`text${i + 1}`, tasks[i].text)
      }
      dispatch(PaperoSendAction())
      dispatch(PaperoAction(formData))
      if(state.act_num !== 0){
        setState({...state, point: state.next_point, next_point: (state.next_point + 1 < timeTable.length) ? state.next_point + 1 : 0, act_num: state.act_num + 1})
      } else {
        setState({...state, act_num: state.act_num + 1})
      }
    }
  }

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
          setState({ ...state, power: false, act_num: 0})
        } else {
          setState({ ...state, power: true})
        }
      }}>
      {(state.power)? <Toggleon htmlColor={green[500]}/> : <Toggleoff />}
    </IconButton>
    </div>
    <List>
    <Container onDrop={e => drop(e)}>
      {timeTable.map((value, i) => {
        const labelId = `checkbox-list-label-${value.name}`;
        return (
          <Draggable >
          <ListItem key={value.num} dense button divider
            onClick={()=>{setState({ ...state, showFlag: true, showTarget: i})}}>
            <ListItemIcon>
            <IconButton edge="end" aria-label="Comments" onClick={(e)=>{
              e.stopPropagation()
              let new_arr = timeTable.slice()
              new_arr.splice(i, 1)
              dispatch(TimeTableChangeAction(new_arr))
              dispatch(TimeTableUpdateAction(makeFormData(new_arr)))
              }}>
              <DeleteIcon />
            </IconButton>
            </ListItemIcon>
            <ListItemText id={labelId} primary={`${value.name}`} />
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
    <SceneShowDialog
      flag={state.showFlag}
      tasks={(timeTable.length !== 0) ? scenes.filter((v)=>{return v.name === timeTable[state.showTarget].name}) : ""}
      handleClose={()=>{setState({ ...state, showFlag: false})}}
      move={() =>{
        if(state.power){
          setState({ ...state, showFlag: false, next_point: state.showTarget});
        } else {
          setState({ ...state, showFlag: false, point: state.showTarget, next_point: (state.showTarget + 1 < state.testTimeTable.length)? state.showTarget + 1 : 0});
        }
      }}
    />
    <SearchDialog 
      flag={state.searchFlag}
      handleClose={()=>{setState({ ...state, searchFlag: false})}}
      addTimeTable={(name)=>{addTimeTable(name)}}/>
    </div>
  );
}
export default TimeTable