import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  root: {
    width: "40vw",
    height: "30vh"
  },
  img: {
    width: "100%",
    height: "100%"
  },
}));

export default function ImageDialog(props) {
  const classes = useStyles();
  const handleClose = () => {
    props.setClose(false);
  };
  return (
    <div>
      <Dialog
        open={props.open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"表示される画像"}</DialogTitle>
        <DialogContent className={classes.root}>
            <img 
             src={props.image_src}
             className={classes.img}/>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Disagree
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}