import React, {Component} from 'react';
import Cropper from 'react-cropper';
import 'cropperjs/dist/cropper.css';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { makeStyles } from '@material-ui/core/styles';

const cropper = React.createRef(null);

/*
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

const classes = useStyles()
*/

export default class CropDialog extends Component{
    constructor(props) {
        super(props);
    }
    handleClose (){
      this.props.close();
    };
    crop(){
        const base64 = this.cropper.getCroppedCanvas().toDataURL('image/jpeg')
        var bin = atob(base64.replace(/^.*,/, ''));
        var buffer = new Uint8Array(bin.length);
        for (var i = 0; i < bin.length; i++) {
            buffer[i] = bin.charCodeAt(i);
        }
        var blob = new Blob([buffer.buffer], {
            type: 'image/jpeg'
        });
        this.props.cropImage(this.cropper.getCroppedCanvas().toDataURL(), blob)
    }
    render() {
        return (
            <div>
                <Dialog
                open={this.props.flag}
                onClose={this.handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                >
                <DialogTitle id="alert-dialog-title">{"表示される画像"}</DialogTitle>
                <DialogContent className={{width: "40vw", height: "30vh"}}>
                <Cropper
                ref={cropper => {
                    this.cropper = cropper;
                }}
                src={this.props.image_src}
                style={{height: 400, width: '100%'}}
                // Cropper.js options
                aspectRatio={16 / 9}
                guides={false} />
                </DialogContent>
                <DialogActions>
                    <Button 
                    onClick={() => {
                        this.crop()
                        //this.handleClose()
                    }} color="primary">
                    Disagree
                    </Button>
                </DialogActions>
                </Dialog>
            </div>
        );
    }
  }


