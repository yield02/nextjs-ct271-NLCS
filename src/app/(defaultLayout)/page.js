"use client"
import { useEffect, useState } from 'react'
import axios from 'axios'

import Category from '@/components/Category/Category'
import styles from './home.module.scss'

export default function Home() {
  
  const [data, setData] = useState([]);

  useEffect(()=> {
    let config = {
      method: 'POST',
      maxBodyLength: Infinity,
      url: 'http://localhost:3000/api/category/getAll',
      headers: {}
    };
    
    axios.request(config)
    .then((response) => {
      setData(response.data);
    })
    .catch((error) => {
      console.log(error);
    });

  }, [data])
  
  return (
    <main className={`${styles.container} container mx-auto`}>
        <div className={styles.box}>
          <div className={`${styles.boxHeader} flex flex-row`}>
            <h4 className={`${styles.boxHeaderText} basis-1/2`}>Thể loại</h4>
            <div className="basis-1/6 text-end">Số bài</div>
            <div className="basis-1/3 text-end">Bài mới</div>
          </div>
          {
          
            data.map((item) => (
              <Category key={item._id} data={item}></Category>
            ))
          }
        </div>
    </main>
  )
}
