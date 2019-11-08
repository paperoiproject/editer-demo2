import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import MenuItem from '@material-ui/core/MenuItem';

import CropDialog from './CropDialog';


const actions = [
    {
      value: 'A',
      label: '笑顔',
    },
    {
      value: 'B',
      label: '周りをみる',
    },
    {
      value: 'C',
      label: 'お辞儀をする',
    },
    {
      value: 'D',
      label: '泣く',
    },
];


const useStyles = makeStyles(theme => ({
    menu: {
      width: "30%",
    },
    SelectAction: {
        paddingRight: "10%"
    },
    TalkText: {
        width: "60%",
    }
}));

var createObjectURL = (window.URL || window.webkitURL).createObjectURL || window.createObjectURL;


export default function AddDialog(props) {
  const classes = useStyles();
  console.log(props.text)
  const [state, setState] = React.useState({
    action: props.action, 
    text: props.text, 
    image_src: "",
    imageCrop: false,
  });
  /*
  const [state, setState] = React.useState({action: "A", text: "", image_src: "", imageCrop: false, image_defo: true});
  */

  

  const handleChange = (name) => event => {
    setState({ ...state, [name]: event.target.value });
  };

  const handleClose = () => {
    props.closeAddFlag();
  };

  const handleTextChange = (e) => {
    setState({
      ...state, 
      text: e.target.value,
    });
  }


  const handleImageChange = (e) => {
    var files = e.target.files;
    var image_src = (files.length===0) ? "" : createObjectURL(files[0]);
    setState({...state, image_src: image_src, imageCrop: true});
  }
  
  

  return (
    <div>
      <Dialog open={props.addFlag} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogContent>
            <TextField
              className={classes.SelectAction}
              id="standard-select-currency"
              select
              label="動作"
              value={state.action}
              onChange={handleChange("action")}
              SelectProps={{
                  MenuProps: {
                    className: classes.menu,
                  },
              }}
              margin="normal"
            >
            {actions.map(option => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
           ))}
          </TextField>
          <TextField
            className={classes.TalkText}
            id="name"
            margin="normal"
            label="話す言葉"
            value={state.text}
            onChange={e => {handleTextChange(e)}}
          />
          <TextField
            id="name"
            margin="normal"
            type="file"
            onChange={e => {handleImageChange(e)}}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={
            () => {
              props.addScene(Object.assign({}, state))
            }} color="primary">
            Subscribe
          </Button>
        </DialogActions>
        {
        (state.imageCrop) ? (
        <CropDialog 
         flag = {state.imageCrop} 
         image_src = {state.image_src}
         cropImage = {(url, file) => {
           setState({...state, image_src: url, image_file: file, image_defo: false, imageCrop: false});
         }}
         close={
           ()=>{setState({...state, imageCrop: false})}
          } />
      ) : ""
    }
      </Dialog>
    </div>
  );
}
