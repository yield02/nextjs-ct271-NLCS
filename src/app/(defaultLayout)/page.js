import Category from '@/components/Category/Category'
import styles from './home.module.scss'

export default function Home() {
  return (
    <main className={`${styles.container} container mx-auto`}>
        <div className={styles.box}>
          <div className={`${styles.boxHeader} flex flex-row`}>
            <h4 className={`${styles.boxHeaderText} basis-1/2`}>Thể loại</h4>
            <div className="basis-1/6 text-end">Số bài</div>
            <div className="basis-1/3 text-end">Bài mới</div>
          </div>
          <Category></Category>
          <Category></Category>
          <Category></Category>
          <Category></Category>
        </div>
    </main>
  )
}
