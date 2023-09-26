"use client"
import Link from "next/link";
import { Tooltip } from 'react-tooltip';
import Image from "next/image";
import { AiOutlineUser } from "react-icons/ai";
import { BsReverseLayoutTextWindowReverse } from "react-icons/bs";
import { FaArrowRightToBracket } from "react-icons/fa6";

import styles from './UserMenu.module.scss'
import MenuItem from "./MenuItem/MenuItem";

export default function UserMenu({children, className='', ...props}) {


    return <Link href={"/user"} id="my-anchor-element" data-tooltip-delay-hide={400}>
            <Image className={styles.avatar} src="/avatar.jpeg" width={40} height={40}></Image>
            <Tooltip
                className={styles.menuContainer}
                anchorSelect="#my-anchor-element"
                place="bottom-end"
                clickable
            >
                <MenuItem href={"/auth/login"} Icon={AiOutlineUser}>Thanh Nhường</MenuItem>
                <MenuItem href={"/auth/login"} Icon={BsReverseLayoutTextWindowReverse}>Bài Viết Của Tôi</MenuItem>
                <MenuItem href={"/auth/login"} Icon={FaArrowRightToBracket}>Đăng xuất</MenuItem>
            </Tooltip>
            </Link> 
}


