import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import ImageIcon from '@material-ui/icons/Image';
import moment from 'moment'

import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';

import { Container, Draggable } from 'react-smooth-dnd';
import { applyDrag, generateItems } from './utils';

import Dialog from '@material-ui/core/Dialog';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Button from '@material-ui/core/Button';
import ImageDialog from './ImageDialog';
import AddDialog from './AddDialog';
import SendDialog from './SendDialog';

import {ScenarioMakeAction, ScenarioUpdateAction} from "../../Store/Action/Actions/goAPI";
import { useSelector, useDispatch } from "react-redux";

const url = "http://localhost:8080/image/get?"
let defo_url =  "http://localhost:8080/image/get?name=defo&num=0";

const useStyles = makeStyles(theme => ({
  root: {
    width: '60%',
    backgroundColor: theme.palette.background.paper,
  },
  fab: {
    position: 'fixed',
    bottom: theme.spacing(20),
    right: theme.spacing(25),
  },
  App: {
    textAlign: "center",
    paddingTop: "8vh",
    display: "flex",
    justifyContent: "center",
  },
  appBar: {
    position: 'relative',
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
  EditSpace: {
    width: "100vw",
    marginTop: "10px",
    display: "flex",
    justifyContent: "center"
  }
}));


const actions = {
  'A':'笑顔',
  'B':'周りをみる',
  'C':'お辞儀をする',
  'D':'泣く'
};


export default function ShowDialog(props) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [state, setState] = React.useState({
    scenes: props.scenes,
    addFlag: false,
    sendFlag: false,
    imageFlag: false,
    image_src: "",
    edit_target:props.edit_target,
    addSceneMode:"",
    addSceneEditIndex:0
  });

  const addScene = (v,mode) => {
    if (mode == "edit"){
      state.scenes[state.addSceneEditIndex].action = v.action
      state.scenes[state.addSceneEditIndex].text = v.text
      state.scenes[state.addSceneEditIndex].image_src = v.image_src
      setState({...state, addFlag:false})
      return
    }
    console.log(v)
    var new_scenes = (state.scenes.length) ? state.scenes.slice() : []
    new_scenes.push(v)
    console.log(new_scenes)
    console.log(state.mode)
    setState({...state, scenes: new_scenes, addFlag: false})
    //setState({...state, scenes: new_scenes, addFlag: false})
  }
  
  const makeFormData = (name) => {
    let formData = new FormData()
    const sceneCnt = state.scenes.length
    formData.append("name", name)
    formData.append("date", moment().format('YYYY-MM-DD HH:mm'))
    formData.append("sceneCnt", sceneCnt)
    for(let i = 0; i < sceneCnt; i++){
      formData.append(`act${i + 1}`, state.scenes[i].action)
      formData.append(`text${i + 1}`, state.scenes[i].text)
      formData.append(`image${i + 1}`, state.scenes[i].image_file)
      if(state.scenes[i].image !== ""){
        formData.append(`imageDefo${i + 1}`, 0)
      } else {
        formData.append(`imageDefo${i + 1}`, 1)
      }
    }
    return formData
  }



  function drop(e){
    setState({...state, tasks: applyDrag(state.tasks, e)})
  }

  function handleAddSceneClick(i){
    console.log(state.scenes[i].image_src)
    setState({...state, addFlag: true, addSceneMode:"edit", addSceneEditIndex:i})
  }
  console.log(state.scenes)
  console.log(state.chFlag)
  
  return (
    <Dialog fullScreen open={props.open} onClose={() => {props.handleClose()}}>

    <AppBar className={classes.appBar}>
      <Toolbar>
        <IconButton edge="start" color="inherit" onClick={()=>{props.close()}} aria-label="Close">
          <CloseIcon />
        </IconButton>
        <Typography variant="h6" className={classes.title}>
         {(state.edit_target < 0)? "シナリオ追加" : "シナリオ編集"}
        </Typography>
        <Button color="inherit" onClick={() => {
         if(props.scenes.length !== 0){
          const formData = makeFormData(props.name)
          dispatch(ScenarioUpdateAction(formData))
          props.close()
         } else {
          setState({...state, sendFlag: true})
         }
        }}>
          {(state.edit_target < 0)? "追加" : "編集"}
        </Button>
      </Toolbar>
    </AppBar>


    <div className = {classes.App}>
    <Fab color="secondary" aria-label="edit" className={classes.fab}>
      <AddIcon onClick={() => {setState({...state, addFlag: true, addSceneMode:""})}}/>
    </Fab>
    <List className={classes.root}>
    <Container onDrop={e => drop(e)}>
      {
       (state.scenes.length) ? state.scenes.map((value, i) => {
        const labelId = `checkbox-list-label-${value}`;
        console.log(state.scenes)
        return (
          <Draggable >
          <ListItem key={value.text} role={undefined} dense button>
            <ListItemIcon>
              <IconButton>
                <EditIcon onClick={(e)=>{
                  console.log(i)
                  handleAddSceneClick(i)
                }}/>
              </IconButton>
              <IconButton>
                <DeleteIcon />
              </IconButton>
            </ListItemIcon>
            <ListItemText id={labelId} primary={`${actions[value.action]}: ${value.text}`} />
            <ListItemSecondaryAction>
              <IconButton edge="end" aria-label="comments">
                <ImageIcon onClick={() => {
                    if(value["image_src"]){
                      setState({...state, imageFlag: true, image_src: value.image_src})
                    }
                    else if(value.image !== ""){
                      setState({...state, imageFlag: true, image_src: `${url}name=${value.name}&num=${value.num}&day=${new Date() - 0}`})
                    }
                    else {
                        setState({...state, imageFlag: true, image_src: defo_url})
                    }
                  }
                }/>
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
          </Draggable>
        );
      }) : ""
      }
    </Container>
    </List>
    <ImageDialog open={state.imageFlag} image_src={state.image_src} setClose={() => setState({...state, imageFlag: false})}/>
    {
      (state.addFlag) ? (
        <AddDialog addFlag = {state.addFlag} 
        
        closeAddFlag={
          ()=>{setState({...state, addFlag: false})}
        }
        addScene={(v,mode) => {addScene(v,state.addSceneMode)}}
        addSceneMode={state.addSceneMode}
        action={(state.addSceneMode==="edit") ? state.scenes[state.addSceneEditIndex].action : "A"}
        text={(state.addSceneMode==="edit") ? state.scenes[state.addSceneEditIndex].text : ""}
        />
      ) : ""
    }
    {
      (state.sendFlag) ? (
        <SendDialog 
         flag = {state.sendFlag} 
         send = {(name) => {
           const formData = makeFormData(name)
           dispatch(ScenarioMakeAction(formData))
           props.close()
         }}
         close={
           ()=>{setState({...state, sendFlag: false})}
         } />
      ) : ""
    }
    </div>
    </Dialog>
  );
}