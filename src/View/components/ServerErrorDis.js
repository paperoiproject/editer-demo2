import React from "react"
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    root: {
     display: "flex",
     justifyContent: "center",
     alignItems: "center",
    }
});


export default function ServerErrorDis(){
    const classes = useStyles();
    return(
     <div className={classes.root}>
            <h1>サーバーが動いていません</h1>
            </div>
        )
}