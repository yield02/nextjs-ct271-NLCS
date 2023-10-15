import { DocumentIcon } from '../Icons';
import { AiOutlineClockCircle, AiOutlineComment } from 'react-icons/ai'
import Image from 'next/image';

import styles from './Post.module.scss'
import Link from 'next/link';


export default function Category({data, Icon=DocumentIcon}) {

    return (
        <div className={`${styles.container} flex-grow`}>
            <div className={`${styles.CategoryBox} flex basis-1/2`}>

                <Icon></Icon>
                
                <Link href={'/'}>
                    <div className={`${styles.CategoryContent}`}>
                        <h4 className={styles.CategoryTitle}>Tên post nè</h4>
                        <p className={styles.Time}><AiOutlineClockCircle className={styles.TimeIcon}/>3 giờ</p>
                    </div>
                </Link>
            </div>
            <div className="basis-1/6 flex justify-end">
                <button>
                <Image className={styles.author} alt="" src="/avatar.jpeg" width={40} height={40}></Image>
                </button>
            </div>
            <div className="basis-1/3 flex justify-end">
                <AiOutlineComment className={styles.commentIcon}/> 30
            </div>
        </div>)
}


