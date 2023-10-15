import Post from '@/components/Post/Post'
import styles from './Categorypage.module.scss'
import { AiOutlineDown, AiOutlineFileAdd } from "react-icons/ai";
import Link from 'next/link';


export default function CategoryPage({params}) {
  return (
    <main className={`${styles.container} container mx-auto`}>
        <div className={styles.box}>
          <div className={`${styles.boxHeader} flex flex-row`}>
            <h4 className={`${styles.boxHeaderText} basis-1/2`}>Bài viết</h4>
            <div className="basis-1/6 text-end"><button className={styles.filterActions}>Author<AiOutlineDown/></button></div>
            <div className="basis-1/3 text-end"><button className={styles.filterActions}>Sort<AiOutlineDown/></button></div>
          </div>
          <div className={`${styles.addPost} flex flex-row`}>
            <Link className={styles.addbtn} href={`./${params.categoryID}/createpost`}><AiOutlineFileAdd className={styles.addIcon}/>Đăng bài viết</Link>
          </div>
          <Post></Post>
          <Post></Post>
          <Post></Post>
          <Post></Post>
        </div>
    </main>
  )
}
