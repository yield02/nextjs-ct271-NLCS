'use client'
import styles from './MyPostComponent.module.scss';
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
import Link from 'next/link';
moment.locale('vi');
import { useSession } from 'next-auth/react';
import { convertState, DeleteManyPost, RestorePost } from './function';
import {deletePostTemp} from '@/app/(defaultLayout)/post/[postID]/function'


export default function MyPostComponent() {
    
    const [filter, setFilter] = useState({sort: 'desc', pageCurrent: 1, pageNumber: 10});
    const [data, setData] = useState([]);
    const [viewData, setViewData] = useState([]);
    const { data: session, status } = useSession();

    // Fetch API
    useEffect(()=> {
        if(session) {
          if(Math.ceil(data.length / 10) < filter.pageCurrent) {
            let config = {
              method: 'post',
              maxBodyLength: Infinity,
              url: 'http://localhost:3000/api/post/getAll',
              headers: { 
                'Content-Type': 'text/plain'
              },
              data : {
                user_id: session?.user?._id,
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
        }
        

      }, [filter.pageCurrent, session])
    // Handle ViewData
    useEffect(()=>{
      if(filter.pageCurrent===1) {
        setViewData(data.slice(0, 9));
      }
      else {
        setViewData(data.slice((filter.pageCurrent-1)*10, (filter.pageCurrent)*10-1));
      }
    }, [data, filter.pageCurrent])

    // console.log(data);

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
            accessorKey: 'createdAt',
            Cell: ({cell}) => (moment(cell.getValue()).format('H:mm giờ, DD/MM/YYYY')),
            header: 'Ngày đăng bài',
            size: 150,
          },
          {
            accessorKey: 'status',
            header: 'Trạng thái',
            Cell: ({cell, row}) => (<>
                <span>{convertState(cell.getValue().status)}</span>
                {cell.getValue().status == 'banned' && 
                <div className={styles.reasonBox}>
                  <span>Lý do: {cell.getValue().reason}</span>
                </div>}
            </>),
            size: 150,
          },
          { 
            Cell: ({row}) => (
              <>
              {
                !row.original.deleteAt &&  
                <Button id="deletePostManager" deletebtn={()=>{deletePostTemp({user_id: row?.original?.author?._id, post_id: row?.original?._id, categoryID: row?.original?.category})}} className={styles.actionBtn}>Ẩn</Button>
              }
              {row.original.deleteAt && 
              <Button onClick={()=> RestorePost(row?.original?._id, row?.original?.author?._id, row?.original?.category?._id, setData)} className={styles.actionBtn}>Khôi phục</Button>
              }
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
            const rows_id = table?.getSelectedRowModel()?.flatRows.map((row) => row.getValue('_id'));
            DeleteManyPost({postsId: rows_id, author_id: table.getRow(0).original.author._id, categoryID: table.getRow(0).original.category}, setData);
          };
 
          return <div className={styles.actionAll}>

              <Button disabled={!table.getIsSomeRowsSelected()} onClick={()=> {handleDelete()}} >Xóa Vĩnh Viễn</Button>

          </div>
        }
    });


    return (
        <div className={styles.container}>
            <div className={` ${styles.header}  flex justify-between`}>
                <div><h1 className={styles.headingText}>Bài viết của tôi</h1></div>
                <div>
                  <SearchManager setData={setData} handle={()=>{}} placeholder="Nhập tên bài viết"></SearchManager>
                </div>
            </div>
            <div>
                <MaterialReactTable table={table} />
                
                <Pagination className={styles.pagination} count={Math.ceil(filter.pageNumber/10)} page={filter.pageCurrent} onChange={(e, value) => setFilter(prev => ({...prev, pageCurrent: value}))} variant="outlined" shape="rounded" />
            
            </div>
        </div>)
}