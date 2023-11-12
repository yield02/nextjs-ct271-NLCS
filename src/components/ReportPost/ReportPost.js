import styles from './ReportPost.module.scss';
import SearchManager from '../SearchManager/SearchManager';

export default function ReportPost({placeholder}) {
    return (
        <div className={styles.container}>
            <div className={` ${styles.header}  flex justify-between`}>
                <div><h1 className={styles.headingText}>Báo cáo bài viết</h1></div>
                <div>
                <SearchManager placeholder="Nhập tên bài viết"></SearchManager>
                </div>
            </div>
            <div>Body</div>
        </div>)
}