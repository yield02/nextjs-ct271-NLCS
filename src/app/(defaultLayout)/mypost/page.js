import styles from './mypost.module.scss'
import Link from 'next/link';
import MyPostComponent from '@/components/MyPostComponent/MyPostComponent';

export default function MyPost({params}) {


  return (
    <main className={`${styles.container} container mx-auto`}>
          <Link className={styles.addbtn} href={`/`}>Trang chủ</Link>
          {` > `}
          <Link href={`/mypost`}>Bài viết của tôi</Link>
        <div className={styles.box}>
          <div>
          </div>
          <MyPostComponent></MyPostComponent>
        </div>
    </main>
  )
}
