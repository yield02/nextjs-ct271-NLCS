import styles from './ManagerAccount.module.scss';
import {
    MaterialReactTable,
    useMaterialReactTable,
  } from 'material-react-table';
import {Pagination, TextField } from '@mui/material';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

import { useEffect, useState, useMemo } from 'react';
import axios from 'axios';
import SearchManager from '../SearchManager/SearchManager';
import Button from '../Button/Button';
import { BannedAccount, DeleteAccount, UnBannedAccount } from './function';

export default function ManagerAccount() {
    const [data, setData] = useState([]);
    const [filter, setFilter] = useState({sort: 'desc', pageCurrent: 1, totalUser: 10});
    const [modal, setModal] = useState({isOpen: false, _id: "" , reason: ""});


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
                setFilter(prev => ({...prev, totalUser: response.data.length}));
                // alert("Thành công");
              }
          })
          .catch((error) => {
            console.log(error);
          });

    }, []);

    const columns = useMemo(
      () => [
        {
          accessorKey: '_id', //access nested data with dot notation
          header: 'ID',
          size: 50,
        },
        {
          accessorKey: 'username',
          header: 'Tên Người Dùng',
          size: 150,
        },
        {
          accessorKey: 'role',
          header: 'Danh hiệu',
          size: 150,
        },
        {
          accessorKey: 'totalPost',
          header: 'Tổng bài đăng',
          size: 150,
        },
        {
          accessorKey: 'address', //normal accessorKey
          header: 'Địa chỉ',
          size: 200,
        },
        {
          accessorKey: 'status', //normal accessorKey
          header: 'Trạng thái',
          Cell: ({cell}) => {
            if(cell.getValue().status == 'allow') {
              return <span>Hoạt động</span>
            }
            else {
              return <div className='flex flex-col'>
                      <span className={styles.status}>Bị khóa</span>
                      <span>Lý do: {cell.getValue().reason}</span>
                     </div>
            }
          },
          size: 200,
        },
        { 
          Cell: ({row}) => (
            <>
              <Button className={styles.actionBtn} id="deleteUser" deletebtn={() => {DeleteAccount(row.original._id, setData)}}>Xóa</Button>
              {row.original.status.status == 'allow' && <Button onClick={() => {setModal(prev => ({...prev, _id: row.original._id, isOpen: true}))}}>Khóa</Button>}
              {row.original.status.status == 'banned' && <Button onClick={() => {UnBannedAccount(row.original._id, setData)}}>Mở Khóa</Button>}
            </>
          ),
          header: 'Hành động',
          size: 150,
        },
      ],
      [],
    );

    const table = useMaterialReactTable({
      columns,
      data,
    });


    return (
    <div className={styles.container}>
        <div className={` ${styles.header}  flex justify-between`}>
            <div><h1 className={styles.headingText}>Quản lý người dùng</h1></div>
            <div className='my-4'>
              <SearchManager setData={setData} manager={true} placeholder="Nhập tên bài viết"></SearchManager>
            </div>
        </div>
        <div>
            <MaterialReactTable table={table} />
            <Pagination className={styles.pagination} count={Math.ceil(filter.totalUser/10)} page={filter.pageCurrent} onChange={(e, value) => setFilter(prev => ({...prev, pageCurrent: value}))} variant="outlined" shape="rounded" />
        </div>
        <div>

        {/* Modal Banned */}
        <Modal
          open={modal.isOpen}
          onClose={() => {setModal(prev => ({...prev, isOpen: false}))}}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box className={styles.modalContainer}>
            <div className={styles.modalBox}>
              <Typography className={styles.modalTitle} id="modal-modal-title">
                Lý do khóa tài khoản
              </Typography>
              <Typography className={styles.modalDescription} id="modal-modal-description">
                <TextField id="outlined-basic" label="Lý do" variant="outlined" value={modal.reason} onChange={(e) => {setModal(prev => ({...prev, reason: e.target.value}))}} />
                <div className={styles.actionBox}>
                  <Button onClick={() => {setModal(prev => ({...prev, reason: '', isOpen: false}))}}>Hủy</Button>
                  <Button onClick={()=>{
                    BannedAccount(modal?._id, modal?.reason, setData)
                    setModal(prev => ({...prev, reason: '', isOpen: false}))
                  }}>Khóa</Button>
                </div>
              </Typography>
            </div>
          </Box>
        </Modal>
        </div>
    </div>)
}