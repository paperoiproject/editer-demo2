import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import Button from '@material-ui/core/Button';

const useStyles = makeStyles({
    paper: {
      width: "30vw",
    },
    root: {
        width: "20vw",
        height: "6vw"
    },
  });

export default function CautionDialog(props){
    const classes = useStyles();
    return (
        <Dialog open={props.open} classes={{paper: classes.paper}} onClose={() => props.close()} scroll="paper">
           <DialogTitle id="dialog-title">注意</DialogTitle>
             <DialogContent dividers="true">
                 タイムテーブルに存在するシナリオです
             </DialogContent>
             <DialogActions className={classes.DialogActions}>
             <Button className={classes.back_button} onClick={() => props.close()} color="primary">
               Back
             </Button>
            </DialogActions>
        </Dialog>
    )
}