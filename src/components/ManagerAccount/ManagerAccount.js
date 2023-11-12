import styles from './ManagerAccount.module.scss';
import {
    MaterialReactTable,
    useMaterialReactTable,
  } from 'material-react-table';
import { Pagination, TextField } from '@mui/material';
import { useEffect, useState } from 'react';
import axios from 'axios';

export default function ManagerAccount() {
    const [data, setData] = useState([]);
    const [filter, setFilter] = useState({sort: 'desc', pageCurrent: 1, pageNumber: 10});

    useEffect(() => {
        
        let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: 'http://localhost:3000/api/user/getAll',
            headers: { 
              'Content-Type': 'application/json'
            },
            data: JSON.stringify(filter)
          };
          
          axios.request(config)
          .then((response) => {
              if(response.status == 200) {
                setData(response.data); 
                alert("Thành công");
              }
          })
          .catch((error) => {
            console.log(error);
          });

    }, [filter.pageCurrent]);

    console.log(data);

    return (
    <div className={styles.container}>
        <div className={` ${styles.header}  flex justify-between`}>
            <div><h1 className={styles.headingText}>Quản lý người dùng</h1></div>
            <div>
              {/* <SearchManager setData={setData} handle={findPostWithName} manager={true} placeholder="Nhập tên bài viết"></SearchManager> */}
            </div>
        </div>
        <div>
            {/* <MaterialReactTable table={table} /> */}
            
            {/* <Pagination className={styles.pagination} count={Math.ceil(filter.pageNumber/10)} page={filter.pageCurrent} onChange={(e, value) => setFilter(prev => ({...prev, pageCurrent: value}))} variant="outlined" shape="rounded" /> */}
        
        </div>
    </div>)
}