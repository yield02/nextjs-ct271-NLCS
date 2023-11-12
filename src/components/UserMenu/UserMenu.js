"use client"
import Link from "next/link";
import { Tooltip } from 'react-tooltip';
import Image from "next/image";
import { AiOutlineUser } from "react-icons/ai";
import { BsReverseLayoutTextWindowReverse } from "react-icons/bs";
import { FaArrowRightToBracket } from "react-icons/fa6";
import { MdOutlineManageAccounts } from "react-icons/md";


import styles from './UserMenu.module.scss'
import MenuItem from "./MenuItem/MenuItem";
import { signOut } from "next-auth/react";

export default function UserMenu({data, children, className='', ...props}) {
    return <Link href={"/user"} id="my-anchor-element" data-tooltip-delay-hide={400}>
        <Image className={styles.avatar} alt="" src="/avatar.jpeg" width={40} height={40}></Image>
        <Tooltip
            className={styles.menuContainer}
            anchorSelect="#my-anchor-element"
            place="bottom-end"
            clickable
        >
            <MenuItem href={"/user"} Icon={AiOutlineUser}>{data?.username}</MenuItem>
            {data?.isAdmin == true && <MenuItem href={"/manager"} Icon={MdOutlineManageAccounts}>Quản lý bài viết</MenuItem>}
            <MenuItem href={"/mypost"} Icon={BsReverseLayoutTextWindowReverse}>Bài viết của tôi</MenuItem>
            <MenuItem onClick={()=>{signOut()}} Icon={FaArrowRightToBracket}>Đăng xuất</MenuItem>
        </Tooltip>
        </Link> 
}


