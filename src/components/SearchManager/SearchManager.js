'use client'
import { useEffect, useState } from 'react';
import Button from '../Button/Button';
import styles from './SearchManager.module.scss'

import { LiaSearchSolid } from 'react-icons/lia';

export default function SearchManager({handle = () => {}, setData, manager=false, placeholder, SearchHandle}) {
    const [value, setValue] = useState('')

    useEffect(()=> {

        const timeOut = setTimeout(()=>{
            if(value!= '') {
                handle(value, setData, manager);
            }
        }, 500);

        return () => clearTimeout(timeOut);

    }, [value])

    return  <div className={styles.searchContainer}>
                <input className={styles.searchInput} placeholder={placeholder} value={value} onChange={(e) => setValue(e.target.value)}></input>
                <Button className={styles.btn} onClick={() => SearchHandle(value)}><LiaSearchSolid></LiaSearchSolid></Button>
            </div>
}