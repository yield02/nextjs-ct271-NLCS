"use client"
import { MdOutlineLocalCafe } from "react-icons/md";
import { AiOutlineCalendar } from "react-icons/ai";
import * as DOMPurify from 'dompurify';
import draftToHtml from 'draftjs-to-html';
import { convertFromRaw } from 'draft-js';
import axios from "axios";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from 'next/image';
import moment from "moment";
import 'moment/locale/vi'
moment.locale('vi');

import styles from './post.module.scss';
import Button from "@/components/Button/Button";
import EditPost from "@/components/EditPost/EditPost";
import CommentEditor from "@/components/CommentEditor/CommentEditor";
import ListComment from "@/components/ListComment/ListComment";
import { deletePost } from './function'


export default function PostPage({params}) {
  const { data: session, status } = useSession();
  const [data, setData] = useState({});
  const [state, setState] = useState("show");

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
    })
    .catch((error) => {
      console.log(error);
    });

  }, [params.postID])
  
    return (
        <div className={`${styles.container} mx-auto`}>
            {data &&
            <>
              <Link href={'/'}>Trang chủ</Link>
              {" > "}
              <Link href={`/category/${data?.category?._id}`}>{data?.category?.category_name}</Link>
              {" > "}
              <Link href={`/post/${data?._id}`}>{data?.title}</Link>

              {state == "show" && 
              <div className={styles.showContainer}>
                <div className={styles.headercontainer}>
                    <h1 className={styles.headerText}>{data?.title}</h1>
                </div>

                <div className={`${styles.authorcontainer} flex flex-row items-center justify-between`}>
                    <div className="flex flex-row items-center">
                      <Image className={styles.avatar} alt="" src="/avatar.jpeg" width={40} height={40}></Image>
                      <div className='flex flex-col'>
                          <h4 className={styles.authorname}>{data?.author?.fullname || data?.author?.username}</h4>
                          <div className='flex flex-row'>
                              <span className={styles.authorinfor}><MdOutlineLocalCafe className={styles.icons}></MdOutlineLocalCafe>Nhà sáng tạo</span>
                              <span className={styles.authorinfor}><AiOutlineCalendar className={styles.icons}></AiOutlineCalendar>{moment(data.createdAt).fromNow()}</span>
                          </div>
                      </div>
                    </div>
                    
                    <div>
                      {
                        <Button className={styles.editBtn}>Báo cáo bài viết</Button>
                      }
                      {
                        
                        data?.author?._id === session?.user?._id && <>
                        {"/"}
                        <Button className={styles.editBtn} id="deletePostBtn" deletebtn={()=>{deletePost({user_id: session?.user?._id, post_id: data?._id, categoryID: data?.category?._id})}}>Xóa</Button>
                        {"/"}
                        <Button className={styles.editBtn} onClick={()=>setState("editnabled")}>Chỉnh sửa bài viết</Button>
                        </>
                        
                      }
                      
                    </div>
                </div>
                <div className={styles.bodycontainer}  dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(draftToHtml(data?.body))}}/>
              </div>
              }
              {
                state == 'editnabled' && <EditPost data={{setData, data, setState, user: session?.user}}></EditPost>
              }

              {
                state == "show" && 
                <div className={styles.commentContainer}>
                  {session?.user?._id  && <CommentEditor></CommentEditor>}
                  <ListComment></ListComment>
                </div>
              }




            </>}
        </div>
        )
}