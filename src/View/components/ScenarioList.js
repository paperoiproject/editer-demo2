import React, { useEffect, useState, useRef } from "react";
import { makeStyles } from '@material-ui/core/styles';
import { TableRow, TableFooter } from '@material-ui/core';
import TablePagination from '@material-ui/core/TablePagination';
import MaterialTable, { MTableBodyRow, MTableHeader}  from 'material-table';
import moment from 'moment'

import ShowDialog from './ShowDialog';

import { useSelector, useDispatch } from "react-redux";

import {ScenarioLoadAction, ScenesLoadAction,ScenarioDeleteAction } from "../../Store/Action/Actions/goAPI";
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
    const {test, scenes} = useSelector(state => state.GoReducer);
    useEffect(
      () => {
        dispatch(ScenarioLoadAction())
        dispatch(ScenesLoadAction())
      },
      [inputRef]
    );

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
          customSort: (a, b) =>{return a.date.getTime() - b.date.getTime()}
        },
      ],
      type: props.type,
      showFlag: false,
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
            icon: 'add',
            tooltip: 'Add',
            isFreeAction: true,
            onClick: (event) => {
              setState({ ...state, addFlag: true})
            }
          },
        ] : []}
        editable={{
          onRowDelete: (props.type !== "add") ? oldData =>
            new Promise(resolve => {
              let formData = new FormData()
              formData.append("name", oldData.name)
              dispatch(ScenarioDeleteAction(formData))
              resolve()
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
      </div>
    );
  }

  export default ScenarioList
