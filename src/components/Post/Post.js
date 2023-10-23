import { DocumentIcon } from '../Icons';
import { AiOutlineClockCircle, AiOutlineComment } from 'react-icons/ai'
import Image from 'next/image';
import moment from 'moment/moment';
import styles from './Post.module.scss'
import Link from 'next/link';
import 'moment/locale/vi'

moment.locale('vi');

export default function Category({data, Icon=DocumentIcon}) {
    return (
        <div className={`${styles.container} flex-grow`}>
            <div className={`${styles.CategoryBox} flex basis-1/2`}>

                <Icon></Icon>
                
                <Link href={`/post/${data?._id}`}>
                    <div className={`${styles.CategoryContent}`}>
                        <h4 className={styles.CategoryTitle}>{data?.title}</h4>
                        <p className={styles.Time}><AiOutlineClockCircle className={styles.TimeIcon}/>{moment(data.createdAt).fromNow()}</p>
                    </div>
                </Link>
            </div>
            <div className="basis-1/6 flex justify-end">
                <button>
                    {data?.author?.username}
                {/* <Image className={styles.author} alt="" src="/avatar.jpeg" width={40} height={40}></Image> */}
                </button>
            </div>
            <div className="basis-1/3 flex justify-end">
                <AiOutlineComment className={styles.commentIcon}/> 30
            </div>
        </div>)
}


