import React, { useEffect, useState, useRef } from "react";
import { makeStyles } from '@material-ui/core/styles';
import { TableRow, TableFooter } from '@material-ui/core';
import TablePagination from '@material-ui/core/TablePagination';
import MaterialTable, { MTableBodyRow, MTableHeader}  from 'material-table';
import moment from 'moment'

import ShowDialog from './ShowDialog';

import { useSelector, useDispatch } from "react-redux";

import {ScenarioLoadAction, ScenesLoadAction} from "../../Store/Action/Actions/goAPI";

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
  

function ScenarioList() {
    const classes = useStyles();
    const dispatch = useDispatch();
    const inputRef = useRef();
    const {test, scenes} = useSelector(state => state.GoReducer);
    const update = () => {
      dispatch(ScenarioLoadAction())
      dispatch(ScenesLoadAction())
    }
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
      showFlag: false,
      addFlag: false,
      showTarget: 0,
      edit_target: -1,
    });
    console.log(scenes)
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
            date: v.date}
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
        actions={[
          {
            icon: 'add',
            tooltip: 'Add',
            isFreeAction: true,
            onClick: (event) => {
              setState({ ...state, addFlag: true})
            }
          },
          {
            icon: 'edit',
            tooltip: 'edit',
            onClick: (event, rowData) => {
              let index = test.findIndex(item => item.name === rowData.name)
              setState({ ...state, dialagFlag: true, edit_target: index})
            }
          }
        ]}
        editable={{
          onRowDelete: oldData =>
            new Promise(resolve => {
              setTimeout(() => {
                console.log(oldData)
                let data = state.test.filter((v) => {
                  return oldData.name !== v.name
                })
                setState({ ...state, test: data})
                resolve();
              }, 600);
            }),
        }}
        components={{
          Row: props => (
            <MTableBodyRow {...props} onRowClick={()=>{
              setState({ ...state, showFlag: true, showTarget: props.data.tableData.id})
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
          name={test[state.showTarget].name} 
          close={()=>{setState({ ...state, addFlag: false})}}/>
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
