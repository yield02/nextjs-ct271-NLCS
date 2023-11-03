import { MdOutlineLocalCafe, MdOutlineEditCalendar, MdOutlineCalendarToday } from "react-icons/md";
import { BiCalendarPlus } from "react-icons/bi";
import Image from 'next/image';
import Link from 'next/link';

import styles from './Comment.module.scss';
import Button from "../Button/Button";

export default function Comment() {

    return (
        <div className={`${styles.container} flex flex-row`}>
            <div className={`${styles.userContainer} flex basis-1/6 flex-col justify-start items-center`}>
                <Image className={styles.avatar} alt="" src="/avatar.jpeg" width={40} height={40}></Image>
                <Link href={'/'} className={styles.username}>Nguyễn Thanh Nhường</Link>
                <span className={`${styles.authorinfor} flex flex-row justify-center items-center`}><MdOutlineLocalCafe className={styles.icons}></MdOutlineLocalCafe>Nhà sáng tạo</span>
                <span className={`${styles.authorinfor} flex flex-row justify-center items-center`}><BiCalendarPlus className={styles.icons}></BiCalendarPlus>3/2/2020</span>
            </div>

            <div className={`${styles.bodyContainer} flex flex-col basis-5/6`}>
                <div className={`${styles.bodyText} basis-5/6`}>
                    comment nèaaaaaaaaaaaaa
                </div>
                <div className={`${styles.bodyAction} flex flex-row basis-1/6 justify-between`}>
                    <div className="flex flex-row">
                        <Button className={styles.editBtn}>Trả lời</Button>
                        <Button className={styles.editBtn}>Chỉnh sửa</Button>
                    </div>
                    <div className="flex flex-row">
                        <span className={`flex justify-center items-center ${styles.information}`}><MdOutlineEditCalendar className={styles.icons}></MdOutlineEditCalendar>Đã chỉnh sửa</span>
                        <span className={`flex justify-center items-center ${styles.information}`}><MdOutlineCalendarToday className={styles.icons}></MdOutlineCalendarToday>2 ngày trước</span>
                    </div>
                </div>
            </div>
        </div>)
}