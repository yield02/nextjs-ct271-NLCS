"use client"
import { MdOutlineLocalCafe } from "react-icons/md";
import { AiOutlineCalendar } from "react-icons/ai";
import * as DOMPurify from 'dompurify';
import draftToHtml from 'draftjs-to-html';
import axios from "axios";
import moment from "moment";
import 'moment/locale/vi'
moment.locale('vi');


import styles from './post.module.scss';
import Image from 'next/image';
import { useEffect, useState } from "react";
import Link from "next/link";


export default function PostPage({params}) {

    const [data, setData] = useState("");


  // Fetch data
  useEffect(()=> {

    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: 'http://localhost:3000/api/post/getOne',
      headers: { 
        'Content-Type': 'text/plain'
      },
      data : {
        postID: params.postID
      }
    };
    
    axios.request(config)
    .then((response) => {
        setData(response.data);
        setEditor(data?.body);
    })
    .catch((error) => {
      console.log(error);
    });

  }, [params.postID])

    console.log(data);

    return (
        <div className={`${styles.container} mx-auto`}>
            {data && 
            <>
            <Link href={'/'}>Trang chủ</Link>
            {" > "}
            <Link href={`/category/${data?.category?._id}`}>{data?.category?.category_name}</Link>
            {" > "}
            <Link href={`/post/${data?._id}`}>{data?.title}</Link>
            <div className={styles.headercontainer}>
                <h1 className={styles.headerText}>{data?.title}</h1>
            </div>
            <div className={`${styles.authorcontainer} flex flex-row items-center`}>
                <Image className={styles.avatar} alt="" src="/avatar.jpeg" width={40} height={40}></Image>
                <div className='flex flex-col'>
                    <h4 className={styles.authorname}>{data?.author?.fullname || data?.author?.username}</h4>
                    <div className='flex flex-row'>
                        <span className={styles.authorinfor}><MdOutlineLocalCafe className={styles.icons}></MdOutlineLocalCafe>Nhà sáng tạo</span>
                        <span className={styles.authorinfor}><AiOutlineCalendar className={styles.icons}></AiOutlineCalendar>{moment(data.createdAt).fromNow()}</span>
                    </div>
                </div>
            </div>
            <div className={styles.bodycontainer}  dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(draftToHtml(data?.body))}}/>

            <div className={styles.footcontainer}>

            </div>
            </>}
        </div>
        )
}