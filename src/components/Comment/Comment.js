import { MdOutlineLocalCafe, MdOutlineEditCalendar } from "react-icons/md";
import { FcManager } from "react-icons/fc";
import { BsClockHistory } from "react-icons/bs";
import { BiCalendarPlus } from "react-icons/bi";
import Image from 'next/image';
import Link from 'next/link';
import DOMPurify from "dompurify";
import draftToHtml from "draftjs-to-html";
import styles from './Comment.module.scss';
import Button from "../Button/Button";

import { EditorState, convertFromRaw, convertToRaw} from 'draft-js';
import { useSession } from "next-auth/react";
import axios from "axios";

import dynamic from 'next/dynamic';
const Editor = dynamic(
  () => import('react-draft-wysiwyg').then(mod => mod.Editor),
  { ssr: false }
)
import '@/../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css';


import moment from "moment";
import 'moment/locale/vi'
import { useState } from "react";
moment.locale('vi');

export default function Comment({data, remove}) {

    const [viewData, setData] = useState(data);
    const [state, setState] = useState("show");
    const { data: session, status } = useSession();
    const [editor, setEditor] = useState(EditorState.createWithContent(convertFromRaw(data.body)));

    const onEditorStateChange = (editor) => {
        setEditor((state) => editor);
    }

    const updateComment = () => {
        if(JSON.stringify(viewData.body) != JSON.stringify(convertToRaw(editor.getCurrentContent()))) {
            const datasubmit = {
                _id: data._id,
                body: convertToRaw(editor.getCurrentContent()),
                user_id: data?.user_id?._id,
              }
        
            let config = {
                method: 'post',
                maxBodyLength: Infinity,
                url: 'http://localhost:3000/api/comment/update',
                headers: { },
                data : datasubmit
              };
            axios.request(config)
                .then((response) => {
                    if(response.status == 200) {
                        setData(prev => (
                            {   ...prev, 
                                body: convertToRaw(editor.getCurrentContent()),
                            }));
                        setState('show');
                    }
                })
                .catch((error) => {
                    console.log(error);
                });
        }
        else {
            setState('show');
        }
    }
    
    const deleteComment = () => {
        const datasubmit = {
            _id: data._id,
          }

        let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: 'http://localhost:3000/api/comment/delete',
            headers: { },
            data : datasubmit
          };

        axios.request(config)
            .then((response) => {
                if(response.status == 200) {
                    remove(data._id);
                }
            })
            .catch((error) => {
                console.log(error);
            });
    }



    return (
        <div className={`${styles.container} flex flex-row`}>
        {state == 'show' && <>
            <div className={`${styles.userContainer} flex basis-1/6 flex-col justify-start items-center`}>
                <Image className={styles.avatar} alt="" src="/avatar.jpeg" width={40} height={40}></Image>
                <Link href={'/'} className={styles.username}>{viewData?.user_id?.fullname || viewData?.user_id?.username}</Link>
                <span className={`${styles.authorinfor} flex flex-row justify-center items-center`}><MdOutlineLocalCafe className={styles.icons}></MdOutlineLocalCafe>{viewData?.user_id?.role}</span>
                {viewData?.user_id?.isAdmin == true && <span className={`${styles.authorinfor} ${styles.admininfor} flex flex-row justify-center items-center`}><FcManager className={styles.icons}></FcManager>Người Kiểm Duyệt</span>}
                <span className={`${styles.authorinfor} flex flex-row justify-center items-center`}><BiCalendarPlus className={styles.icons}></BiCalendarPlus>{moment(viewData?.user_id?.createdAt).format('DD/MM/YYYY')}</span>
            </div>

            <div className={`${styles.bodyContainer} flex flex-col basis-5/6`}>
                
                <div className={`${styles.bodyText} basis-5/6`} dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(draftToHtml(viewData?.body))}}/>

                <div className={`${styles.bodyAction} flex flex-row basis-1/6 justify-between`}>
                    <div className="flex flex-row">
                        {/* <Button className={styles.editBtn}>Trả lời</Button> */}
                        {
                            session?.user?._id == viewData?.user_id?._id && 
                            <>
                                <Button className={styles.editBtn} id="deleteCommentBtn" deletebtn={deleteComment}>Xóa</Button>
                                <Button className={styles.editBtn} onClick={()=> {setState('editnable')}}>Chỉnh sửa</Button>
                            </>
                        }
                    </div>
                    <div className="flex flex-row">
                        {
                            viewData?.createdAt != viewData?.updatedAt && 
                            <span className={`flex justify-center items-center ${styles.information}`}>
                                <MdOutlineEditCalendar className={styles.icons}></MdOutlineEditCalendar>Đã chỉnh sửa
                            </span>
                        }
                        <span className={`flex justify-center items-center ${styles.information}`}><BsClockHistory className={styles.icons}></BsClockHistory>{moment(viewData?.updatedAt).fromNow()}</span>
                    </div>
                </div>
            </div>
        </>}
        {
            state == 'editnable' && 
            <div>
                <Editor
                editorState={editor}
                wrapperClassName="demo-wrapper"
                editorClassName={styles.editor}
                onEditorStateChange={onEditorStateChange}
                />
                <Button className={styles.saveBtn} onClick={updateComment}>Lưu</Button>
            </div>
        }
    </div>

    )
}