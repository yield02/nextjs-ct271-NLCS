
import Comment from "@/components/Comment/Comment";
import styles from './ListComment.module.scss';
import {useEffect, useState } from "react";
import axios from "axios";
import CommentEditor from "@/components/CommentEditor/CommentEditor";



export default function ListComment({post_id, session}) {
    const [sort, setSort] = useState("desc");
    const [commentList, setCommentList] = useState([]);
    const [pageNum, setPageNum] = useState(1);

    const getComment = () => {
      let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: 'http://localhost:3000/api/comment/getAll',
        headers: { 
          'Content-Type': 'text/plain'
        },
        data : {
          sort: sort,
          post_id: post_id,
          page: pageNum
        }
      };
      
      axios.request(config)
      .then((response) => {
        setCommentList(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
    }


    useEffect(()=> {
      getComment();
    }, [pageNum]); 

    const removeItem = (id) => {
      const newList = commentList.filter(comment => comment._id !== id);
      setCommentList(() => newList)
    }

    return (
    <div className={styles.container}>
        {session?.user?._id  && <CommentEditor post_id={post_id} updateComment={getComment}></CommentEditor>}
        {
          commentList.map((data) => <Comment key={data._id} remove={removeItem} data={data}></Comment>)
        }
    </div>)
}