"use client"
import { Editor } from 'react-draft-wysiwyg';
import '@/../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { useState } from "react";
import { EditorState, convertFromRaw, convertToRaw} from 'draft-js';



import styles from "./CommentEditor.module.scss";
import Button from '@/components/Button/Button';

export default function CommentEditor() {
    const [editor, setEditor] = useState(EditorState.createEmpty());

    function onEditorStateChange(editor){
        setEditor((state) => editor);
    }




    return <div className={styles.container}>
        <Editor
            editorState={editor}
            wrapperClassName="demo-wrapper"
            editorClassName={styles.editor}
            onEditorStateChange={onEditorStateChange}
        />
        <Button className={styles.submitBtn}>
            Đăng bình luận
        </Button>
    </div>
}