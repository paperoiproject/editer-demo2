import React, { useEffect, useState, useRef } from "react";
import { makeStyles } from '@material-ui/core/styles';
import { TableRow, TableFooter } from '@material-ui/core';
import TablePagination from '@material-ui/core/TablePagination';
import MaterialTable, { MTableBodyRow, MTableHeader}  from 'material-table';
import moment from 'moment'

import ShowDialog from './ShowDialog';
import CautionDialog from './CautionDialog';
import PlayIcon from '@material-ui/icons/PlayCircleOutline';

import { useSelector, useDispatch } from "react-redux";

import {ScenarioLoadAction, ScenesLoadAction, ScenarioDeleteAction, TimeTableLoadAction, PaperoAction} from "../../Store/Action/Actions/goAPI";
import ServerErrorDis from "./ServerErrorDis"
const useStyles = makeStyles({
  root: {
    width: "60vw",
    hight: "70vh"
  },
  TablePagination: {
   display: "flex",
   justifyContent: "center",
  }
});
  

function ScenarioList(props) {
    const classes = useStyles();
    const dispatch = useDispatch();
    const inputRef = useRef();
    const {test, scenes, timeTable} = useSelector(state => state.GoReducer);
    useEffect(
      () => {
        dispatch(ScenarioLoadAction())
        dispatch(ScenesLoadAction())
        dispatch(TimeTableLoadAction())
      },
      [inputRef]
    );

    const postWork = (name) =>{
      let tasks = scenes.filter((v)=>{return v.name === name})
      let formData = new FormData()
      formData.append("name", name)
      formData.append("size", tasks.length);
      for(let i = 0; i < tasks.length; i++){
        formData.append(`act${i + 1}`, tasks[i].action)
        formData.append(`text${i + 1}`, tasks[i].text)
      }
      dispatch(PaperoAction(formData))
    }

    const [state, setState] = React.useState({
      columns: [
        { 
         title: 'シナリオ名', 
         field: 'name', 
         sorting: false
        },
        {
          title: '作成日/編集日',
          field: 'day',
          type: 'numeric',
          customSort: (a, b) =>{return new Date(Date.parse(a.date)).getTime() -  new Date(Date.parse(b.date)).getTime()}
        },
      ],
      type: props.type,
      showFlag: false,
      cautionFlag: false,
      addFlag: false,
      showTarget: 0,
      edit_target: -1,
    });
    console.log(scenes)

    const addTimeTable = (name) => {
      props.addTimeTable(name)
    }

    if (test === undefined){
      console.log("OK")
      return (<ServerErrorDis/>)
    }
    return (
      <div className={classes.root}>
      <MaterialTable
        title="作成したシナリオ一覧"
        className={classes.root}
        columns={state.columns}
        data={test.map((v)=>{
          return {
            name: v.name,
            day:  moment(v.date).format('YYYY年MM月DD日HH時mm分'),
            date: v.date
          }
        })}
        options={{
          pageSize: 10,
        }}
        localization={{
         toolbar: {
             nRowsSelected: '{0} row(s) selected'
         },
         header: {
             actions: ''
         },
         body: {
             emptyDataSourceMessage: 'No records to display',
             filterRow: {
                 filterTooltip: 'Filter'
             },
             editRow: {
               deleteText: "本当に削除しますか？",
               saveTooltip: "削除",
               cancelTooltip:"キャンセル"
             }
         }
       }}
        actions={(props.type !== "add") ? [
          {
            icon: PlayIcon,
            tooltip: '再生',
            onClick: (event, rowData) => {
             postWork(rowData.name)
            }
          },
          {
            icon: 'add',
            tooltip: 'Add',
            isFreeAction: true,
            onClick: (event) => {
              setState({ ...state, addFlag: true})
            }
          },

        ] : [
          {
            icon: PlayIcon,
            tooltip: '再生',
            onClick: (event, rowData) => {
              postWork(rowData.name)
             }
          },
        ]}
        editable={{
          onRowDelete: (props.type !== "add") ? oldData =>
            new Promise(resolve => {
              let formData = new FormData()
              let timeTableFlag = timeTable.some((v) => v.name === oldData.name)
              if(timeTableFlag){
                setState({ ...state, cautionFlag: true})
                resolve()
              } else {
                formData.append("name", oldData.name)
                dispatch(ScenarioDeleteAction(formData))
                resolve()
              }
            }) : ""
        }}
        components={{
          Row: props => (
            <MTableBodyRow {...props} onRowClick={()=>{
              if(state.type !== "add"){
                setState({ ...state, showFlag: true, showTarget: props.data.tableData.id})
              } else {
                addTimeTable(props.data.name)
              }
            }}/>
          ),
          Pagination: props => (
            <TableFooter className={classes.TablePagination}>
              <TableRow>
                <TablePagination  {...props} rowsPerPageOptions = {[]}/>
            </TableRow>
           </TableFooter>
          ),
        }}
      />  
      {
        (state.addFlag) ? (
          <ShowDialog 
          open={state.addFlag} 
          scenes={[]} 
          close={()=>{setState({ ...state, addFlag: false})}}
          edit_target={state.edit_target}
          />
        ) : ""
      }
      {
        (state.showFlag) ? (
          <ShowDialog 
          open={state.showFlag} 
          tasks={test[state.showTarget].tasks} 
          scenes={scenes.filter(v => v.name === test[state.showTarget].name).sort((a, b)=> {
            return a.num - b.num
          })}
          name={test[state.showTarget].name} 
          close={()=>{setState({ ...state, showFlag: false, showTarget: 0})}}/>
        ) : ""
      }
      <CautionDialog open={state.cautionFlag} close={()=>{setState({ ...state, cautionFlag: false})}}/>
      </div>
    );
  }

  export default ScenarioList
