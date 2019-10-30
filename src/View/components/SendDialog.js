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

const useStyles = makeStyles(theme => ({
    TalkText: {
        width: "30vw",
    }
}));
export default function SendDialog(props) {
  const classes = useStyles();
  const [text, setText] = React.useState("");

  const handleClose = () => {
    props.close();
  };

  const handleTextChange = (e) => {
    setText(e.target.value);
  }
  console.log("bb")
  return (
    <div>
      <Dialog open={props.flag} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogContent>
          <TextField
            className={classes.TalkText}
            id="name"
            margin="normal"
            label="シナリオ名の設定"
            onChange={e => {handleTextChange(e)}}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            編集に戻る
          </Button>
          <Button 
           onClick={() => {
               console.log(text)
               props.send(text)
            }} color="primary">
            シナリオを確定
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}