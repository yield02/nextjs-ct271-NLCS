"use client"

import Post from '@/components/Post/Post'
import styles from './Categorypage.module.scss'
import { AiOutlineDown, AiOutlineFileAdd } from "react-icons/ai";
import Link from 'next/link';
import { useEffect, useState } from 'react';
import axios from 'axios';



export default function CategoryPage({params}) {

  const [data, setData] = useState([]);
  const [sort, setSort] = useState("desc");

  // Fetch data categoryList
  useEffect(()=> {

    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: 'http://localhost:3000/api/post/getAll',
      headers: { 
        'Content-Type': 'application/json'
      },
      data : JSON.stringify({
        sort: sort,
        categoryID: params.categoryID
      })
    };
    
    axios.request(config)
    .then((response) => {
        console.log(response.data);
        setData(response.data);
    })
    .catch((error) => {
      console.log(error);
    });

  }, [])
  return (
    <main className={`${styles.container} container mx-auto`}>
          <Link className={styles.addbtn} href={`/`}>Trang chủ</Link>
          {` > `}
          <Link href={`./${params.categoryID}`}>{data[0]?.category?.category_name}</Link>
        <div className={styles.box}>
          <div className={`${styles.boxHeader} flex flex-row`}>
            <h4 className={`${styles.boxHeaderText} basis-1/2`}>Bài viết</h4>
            <div className="basis-1/6 text-end"><button className={styles.filterActions}>Tác giả<AiOutlineDown/></button></div>
            <div className="basis-1/3 text-end"><button className={styles.filterActions}>Bộ lọc<AiOutlineDown/></button></div>
          </div>
          <div className={`${styles.addPost} flex flex-row`}>
            <Link className={styles.addbtn} href={`./${params.categoryID}/createpost`}><AiOutlineFileAdd className={styles.addIcon}/>Đăng bài viết</Link>
          </div>
          {data.map(item => <Post key={item._id} data={item}></Post>)}
        </div>
    </main>
  )
}
