import styles from './Category.module.scss'
import Link from 'next/link';
import { DocumentIcon } from '../Icons';


export default function Category({data, Icon=DocumentIcon}) {

    return (
        <div className={`${styles.container} flex-grow`}>
            <div className={`${styles.CategoryBox} flex basis-1/2`}>
                <Icon></Icon>
                <Link href={'/'}>
                    <div className={`${styles.CategoryContent}`}>
                        <h4 className={styles.CategoryTitle}>Nhân sự</h4>
                        <p className={styles.Description}>Description qwdqwdqwdqwd</p>
                    </div>
                </Link>
            </div>
            <div className="basis-1/6 text-end">
                1231
            </div>
            <div className="basis-1/3 text-end">
                2 years, 2 months ago
                </div>
        </div>)
}


