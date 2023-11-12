'use client'
import styles from './ManagerPost.module.scss';
import SearchManager from '../SearchManager/SearchManager';
import { useEffect, useState, useMemo } from 'react';
import axios from 'axios';
import { Pagination, TextField } from '@mui/material';
import {
  MaterialReactTable,
  useMaterialReactTable,
} from 'material-react-table';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';

import Button from '../Button/Button';
import moment from "moment";
import 'moment/locale/vi'
import { fetchUpdateStatus, updateStatus, fetchDeletePost, findPostWithName } from './function';
import Link from 'next/link';
moment.locale('vi');




export default function ManagerPost() {
    
    const [filter, setFilter] = useState({sort: 'desc', pageCurrent: 1, pageNumber: 10});
    const [data, setData] = useState([]);
    const [viewData, setViewData] = useState([]);
    // Fetch API
    useEffect(()=> {
        if(Math.ceil(data.length / 10) < filter.pageCurrent) {
          let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: 'http://localhost:3000/api/post/getAll',
            headers: { 
              'Content-Type': 'text/plain'
            },
            data : {
              manager: true,
              sort: filter?.sort,
              page: filter.pageCurrent
            }
          };
          
          axios.request(config)
          .then((response) => {
              setData(prev => [...data, ...response.data.posts]);
              setFilter(prev => ({...prev, pageNumber: response.data.totalPost}))
          })
          .catch((error) => {
            console.log(error);
          });
        }
        

      }, [filter.pageCurrent])
    // Handle ViewData
    useEffect(()=>{
      if(filter.pageCurrent===1) {
        setViewData(data.slice(0, 9));
      }
      else {
        setViewData(data.slice((filter.pageCurrent-1)*10, (filter.pageCurrent)*10-1));
      }
    }, [data, filter.pageCurrent])


    const columns = useMemo(
        () => [
          {
            accessorKey: '_id', //access nested data with dot notation,
            header: 'ID',
            Cell: ({cell, row}) => <Link className={styles.postsLink} href={`/post/${cell.getValue()}`}>{cell.getValue()}</Link>,
            size: 50,
          },
          {
            accessorKey: 'title',
            header: 'Chủ đề',
            size: 150,
          },
          {
            accessorKey: 'category.category_name',
            header: 'Thể loại',
            size: 150,
          },
          {
            accessorKey: 'author.username',
            header: 'Tác giả',
            size: 150,
          },
          {
            accessorKey: 'createdAt',
            Cell: ({cell}) => (moment(cell.getValue()).format('H:mm giờ, DD/MM/YYYY')),
            header: 'Ngày đăng bài',
            size: 150,
          },
          {
            accessorKey: 'status',
            header: 'Trạng thái',
            Cell: ({cell, row}) => (<>
                <Select
                  id="demo-select-small"
                  value={cell.getValue().status}
                  onChange={(e) => {
                    updateStatus(setData, row.getValue('_id'), e.target.value, cell.getValue().reason)
                  }}
                >
                  <MenuItem value={'allow'}>Cho phép</MenuItem>
                  <MenuItem value={'waiting'}>Chờ duyệt</MenuItem>
                  <MenuItem value={'banned'}>Cấm</MenuItem>
                  <MenuItem value={'delete'}>Ẩn</MenuItem>
                </Select>
                {cell.getValue().status == 'banned' && 
                <div className={styles.reasonBox}>
                  <span>Lý do:</span>
                  <TextField id="standard-basic" 
                    variant="standard" 
                    value={cell.getValue().reason}
                    onChange={(e) => {updateStatus(setData, row.getValue('_id'), cell.getValue().status, e.target.value)}}
                    />
                </div>}
            </>),
            size: 150,
          },
          { 
            Cell: ({row}) => (
              <>
              <Button id="deletePostManager" deletebtn={()=>fetchDeletePost({_id: row.getValue('_id')}, setData)} className={styles.actionBtn}>Xóa</Button>
              <Button onClick={()=> fetchUpdateStatus({_id: row.getValue('_id'), status: row.getValue('status')})} className={styles.actionBtn}>Cập nhật</Button>
              </>
            ),
            header: 'Hành động',
            size: 150,
          }
        ],
        [],
    );
    
    const table = useMaterialReactTable({
        columns,
        data: viewData,
        enablePagination: false,
        enableRowSelection: true,
        renderTopToolbar: ({ table }) => {

          const handleDelete = () => {
            const rows = table?.getSelectedRowModel()?.flatRows.map((row) => row.getValue('_id'));
            console.log(rows);

          };

         const handleAllow = () => {

            const rows = table?.getSelectedRowModel()?.flatRows.map((row) => row.getValue('_id'));
            console.log(rows);

          }
 
          return <div className={styles.actionAll}>

              <Button disabled={!table.getIsSomeRowsSelected()}  id="deleteManage" deletebtn={handleDelete}>Xóa</Button>
              <Button disabled={!table.getIsSomeRowsSelected()}  onClick={handleAllow}>Duyệt</Button>

          </div>
        }
    });


    return (
        <div className={styles.container}>
            <div className={` ${styles.header}  flex justify-between`}>
                <div><h1 className={styles.headingText}>Quản lý bài viết</h1></div>
                <div>
                  <SearchManager setData={setData} handle={findPostWithName} manager={true} placeholder="Nhập tên bài viết"></SearchManager>
                </div>
            </div>
            <div>
                <MaterialReactTable table={table} />
                
                <Pagination className={styles.pagination} count={Math.ceil(filter.pageNumber/10)} page={filter.pageCurrent} onChange={(e, value) => setFilter(prev => ({...prev, pageCurrent: value}))} variant="outlined" shape="rounded" />
            
            </div>
        </div>)
}