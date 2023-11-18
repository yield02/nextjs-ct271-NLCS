'use client'
import { useEffect, useState } from 'react';
import Button from '../Button/Button';
import styles from './Search.module.scss'
import { LiaSearchSolid } from 'react-icons/lia';
import axios from 'axios';
import Link from 'next/link';

export default function Search() {

    const [value, setValue] = useState('')
    const [searchModal, setSearchModal] = useState(false);
    const [data, setData] = useState([]);

    const searchHandle = (name) => {

        let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: 'http://localhost:3000/api/post/findWithName',
            headers: { 
              'Content-Type': 'application/json'
            },
            data : JSON.stringify({name})
          };
          
          axios.request(config)
          .then((response) => {
              if(response.status == 200) {
                setData((prev) => ([...response.data]))
              }
          })
          .catch((error) => {
            console.log(error);
          });

    }


    useEffect(()=> {

        const timeOut = setTimeout(()=>{
            if(value!= '') {
                searchHandle(value);
            }
        }, 500);

        return () => clearTimeout(timeOut);

    }, [value])

    // console.log(data);

    return  <div className={styles.searchContainer} onBlur={() => {setSearchModal(false)}}>
                <input className={styles.searchInput} value={value} onChange={(e) => {setValue(e.target.value)}} onInput={() => {if(searchModal == false) {setSearchModal(true)} }} placeholder='Tìm kiếm bài viết'></input>
                <Button className={styles.btn} onClick={() => {}}><LiaSearchSolid></LiaSearchSolid></Button>
                {searchModal && 
                    <div className={styles.resultContainer}>
                        {data.length > 0 && 
                            data.map((item) => {
                                return <>
                                    <div className={`${styles.item} flex justify-center items-center`} >
                                        <div className='basis-3/5'>
                                            <p><Link href={`/post/${item._id}`}>{item.title}</Link></p>
                                        </div>
                                        <div className='basis-2/5'>
                                            {item?.author?.username}
                                        </div>
                                    </div>
                                    </>
                            })
                        }
                        {data.length <= 0 && <div className={`${styles.item} flex justify-center items-center`} >
                                        <div className='basis-3/5'>
                                            <p>Không có kết quả nào!!</p>
                                        </div>
                                    </div>}
                    </div>}

            </div>
}