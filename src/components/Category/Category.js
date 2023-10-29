import styles from './Category.module.scss'
import Link from 'next/link';
import { DocumentIcon } from '../Icons';


export default function Category({data, Icon=DocumentIcon}) {

    return (
        <div className={`${styles.container} flex-grow`}>
            <div className={`${styles.CategoryBox} flex basis-1/2`}>
                <Icon></Icon>
                <Link href={`/category/${data._id}`}>
                    <div className={`${styles.CategoryContent}`}>
                        <h4 className={styles.CategoryTitle}>{data.category_name}</h4>
                        <p className={styles.Description}>{data.description}</p>
                    </div>
                </Link>
            </div>
            <div className="basis-1/6 text-end">
                {data?.numberPost}
            </div>
            <div className="flex basis-1/3 justify-end">
                <Link href={`/post/${data?.newPost?._id}`} className={`text-ellipsis overflow-hidden whitespace-nowrap ${styles.newPost}`}>{data?.newPost?.title}</Link>
            </div>
        </div>)
}


