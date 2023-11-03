import Comment from "@/components/Comment/Comment";
import styles from './ListComment.module.scss';

export default function ListComment({postID, pageNumber=1}) {

    return (
    <div className={styles.container}>
        <Comment></Comment>
        <Comment></Comment>
        <Comment></Comment>
        <Comment></Comment>
    </div>)
}