"use client"
import { Editor } from 'react-draft-wysiwyg'
import { EditorState, convertToRaw } from 'draft-js';
import { useState } from 'react';
import draftToHtml from 'draftjs-to-html';
import '@/../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css' 
import * as DOMPurify from 'dompurify';
import { useSession } from 'next-auth/react';
import isAuthencation from '@/untils/auth';
import Link from 'next/link';

import styles from './createpost.module.scss'
import Button from '@/components/Button/Button';



export default function CreatePost({params}) {
    const { data: session, status } = useSession();
    // isAuthencation(session);
    


    const [editor, setEditor] = useState(EditorState.createEmpty());

    console.log(typeof editor);

    // let html = draftToHtml(convertToRaw(editor.getCurrentContent()));
    
    function onEditorStateChange(editorState){
      setEditor(editorState)
    }

    return (
        <main className={`${styles.container} container mx-auto`}>
          <div>
            <Link href='/'>Trang chủ</Link>
            <span>/</span>
            <Link href={`/category/${params.categoryID}`}>{params.categoryID}</Link>
          </div>
        <div className={styles.box}>
          <h1 className={styles.headerText}>TẠO BÀI VIẾT</h1>
          <form>
            <div className={`${styles.titleBox} flex justify-start flex-col`}>
              <label className={styles.labelTitle} for="title">Tiêu đề bài viết:</label>
              <input className={styles.title} id="title" type='text' name="title"></input>
            </div>
            <div>
              <label className={styles.labelTitle} for="title">Nội dung bài viết:</label>
              <Editor
                editorState={editor}
                wrapperClassName="demo-wrapper"
                editorClassName="demo-editor"
                onEditorStateChange={onEditorStateChange}
              />
            </div>
            <div className='flex justify-center'>
              <Button className={styles.submitBtn}>đăng bài</Button>
            </div>
          </form>
        </div>
        {/* <div className={styles.box}>
  
          <h1 className={styles.headerText}>XEM TRƯỚC</h1>
          <div className={styles.showcontent} dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(draftToHtml(convertToRaw(editor.getCurrentContent())))}}/>
        </div> */}
    </main>
    )
}