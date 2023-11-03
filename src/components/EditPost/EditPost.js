"use client"
import Image from 'next/image';
import { MdOutlineLocalCafe } from "react-icons/md";
import { AiOutlineCalendar } from "react-icons/ai";
import '@/../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { EditorState, convertFromRaw, convertToRaw} from 'draft-js';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Editor } from 'react-draft-wysiwyg';
import moment from "moment";
import 'moment/locale/vi'
moment.locale('vi');

import styles from './EditPost.module.scss';
import Button from '../Button/Button';

export default function EditPost({data}) {

    const {setState, data: viewData, user, setData} = data;
    const [editor, setEditor] = useState(EditorState.createEmpty());
    const [title, setTitle] = useState(viewData?.title || "");


    useEffect(()=> {
        if(viewData.body) {
            console.log(viewData.body)
            setEditor(EditorState.createWithContent(convertFromRaw(viewData.body)));
        }
    }, [viewData])


    function onEditorStateChange(editor){
      setEditor((state) => editor);
    }

    function updatePost() {

        const data = {
            body: convertToRaw(editor.getCurrentContent()),
            title,
            user_id: user?._id,
            post_id: viewData._id,
          }
    
        let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: 'http://localhost:3000/api/post/update',
            headers: { },
            data : data
          };
        axios.request(config)
            .then((response) => {
                if(response.status == 200) {
                    setData(prev => (
                        {   ...prev, 
                            body: convertToRaw(editor.getCurrentContent()),
                            title: title
                        }));
                    setState('show');
                }
            })
            .catch((error) => {
                console.log(error);
            });
    }


    return (
    <>
                <div className={`${styles.authorcontainer} flex flex-row items-center justify-between`}>
                    <div className="flex flex-row items-center">
                      <Image className={styles.avatar} alt="" src="/avatar.jpeg" width={40} height={40}></Image>
                      <div className='flex flex-col'>
                          <h4 className={styles.authorname}>{viewData?.author?.fullname || viewData?.author?.username}</h4>
                          <div className='flex flex-row'>
                              <span className={styles.authorinfor}><MdOutlineLocalCafe className={styles.icons}></MdOutlineLocalCafe>Nhà sáng tạo</span>
                              <span className={styles.authorinfor}><AiOutlineCalendar className={styles.icons}></AiOutlineCalendar>{moment(data.createdAt).fromNow()}</span>
                          </div>
                      </div>
                    </div>
                </div>

                <div className={styles.headercontainer}>
                    <label>Tiêu đề:</label>
                    <input className={styles.headerText} onChange={(e) => setTitle(e.target.value)} value={title}></input>
                </div>
                <div className={styles.editor}>
                    <Editor
                    editorState={editor}
                    wrapperClassName="demo-wrapper"
                    editorClassName="demo-editor"
                    onEditorStateChange={onEditorStateChange}
                    />
                </div>
                <div>
                    <Button className={styles.submitBtn} onClick={updatePost}>Lưu Bài Viết</Button>
                </div>
                
    </>
    )
}

    