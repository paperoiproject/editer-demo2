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
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';


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

const url = "https://10.70.85.150:443/image/get?"
let defo_url =  "https://10.70.85.150:443/image/get?name=defo&num=0";

const useStyles = makeStyles({
    paper: {
      width: "30vw",
    },
    root: {
        width: "20vw",
        height: "6vw"
    },
  });

export default function ScenarioList(props){
    const classes = useStyles();
    const [state, setState] = React.useState({
        scenes: props.scenes,
        addFlag: false,
        sendFlag: false,
        imageFlag: false,
        image_src: "",
        addSceneMode:"",
        addSceneEditIndex:0
    });
    console.log(props.tasks)
    return (
        <Dialog open={props.flag} classes={{paper: classes.paper}} onClose={() => props.handleClose()} scroll="paper">
           <DialogTitle id="dialog-title">{(props.tasks.length) ? props.tasks[0].name : ""}</DialogTitle>
             <DialogContent dividers="true">
             <List>
              {
                (props.tasks.length) ? props.tasks.map((value, i) => {
                   const labelId = `checkbox-list-label-${value.name}`;
                      return (
                      <ListItem key={value.text}>
                         <ListItemText id={labelId} primary={`${value.action}: ${value.text}`} />
                         <ListItemSecondaryAction>
                         <IconButton edge="end" aria-label="comments">
                         <ImageIcon onClick={() => {
                           if(value["image"] === ""){
                             setState({...state, imageFlag: true, image_src: defo_url})
                           }
                           else {
                             setState({...state, imageFlag: true, image_src: `${url}name=${value.name}&num=${value.num}&day=${new Date() - 0}`})
                            }
                          }}/>
                         </IconButton>
                        </ListItemSecondaryAction>
                      </ListItem>
                      );
                 }) : ""
              }
             </List>
             </DialogContent>
             <DialogActions className={classes.DialogActions}>
             <Button className={classes.edit_button}
              onClick={
                () =>{
                  props.handleClose()
                  props.move()
                }
              }
              color="primary">移動する</Button>
             <Button className={classes.back_button} onClick={() => props.handleClose()} color="primary">
               Back
             </Button>
            </DialogActions>
            <ImageDialog open={state.imageFlag} image_src={state.image_src} setClose={() => setState({...state, imageFlag: false})}/>
        </Dialog>
    )
}