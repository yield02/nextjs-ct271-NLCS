"use client"
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { useCallback, useState } from "react";
import { EditorState, convertFromRaw, convertToRaw} from 'draft-js';
import { useSession } from 'next-auth/react';
import axios from "axios";

import styles from "./CommentEditor.module.scss";
import Button from '@/components/Button/Button';


import dynamic from 'next/dynamic';
const Editor = dynamic(
  () => import('react-draft-wysiwyg').then(mod => mod.Editor),
  { ssr: false }
)
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { set } from "mongoose";

export default function CommentEditor({post_id, updateComment}) {

    const { data: session, status } = useSession();
    const [editor, setEditor] = useState(EditorState.createEmpty());

    function onEditorStateChange(editor){
        setEditor((state) => editor);
    }

   
    const submitComment = () => {
        const body = editor.getCurrentContent();
        if(body.hasText()) {
          const data = {
            body: convertToRaw(body),
            user_id: session?.user?._id,
            post_id: post_id
          }
          
          let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: 'http://localhost:3000/api/comment/create',
            headers: { 
              'Content-Type': 'application/json'
            },
            data : JSON.stringify(data),
          };
          
          axios.request(config)
          .then((response) => {
            setEditor(EditorState.createEmpty());
            updateComment();
          })
          .catch((error) => {
            console.log(error);
          });
        }
        
    };



    return <div className={styles.container}>
        <Editor
            editorState={editor}
            wrapperClassName="demo-wrapper"
            editorClassName={styles.editor}
            onEditorStateChange={onEditorStateChange}
        />
        <Button className={styles.submitBtn} onClick={submitComment}>
            Đăng bình luận
        </Button>
    </div>
}