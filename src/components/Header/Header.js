"use client"
import styles from './Header.module.scss'
import Link from 'next/link'
import Image from 'next/image'
import Search from '../Search/Search'
import Button from '../Button/Button'
import { useSession } from 'next-auth/react'
import UserMenu from '../UserMenu/UserMenu'

export default function Header() {

    const { data: session, status } = useSession();

    return (
    <nav className={`${styles.container} mx-auto`}>
        <div className={`${styles.header} container mx-auto flex justify-between`}>
            <div className={`flex justify-center items-center`}>
                <div className='mr-14'>
                    <Link href='/'>
                        <Image className={styles.icon} src="/header/header-icon.png" width={160} height={160} alt='header-icon'></Image>
                    </Link>
                </div>
                <div>
                    <Search></Search>
                </div>
            </div>
            <div className={`flex justify-center items-center`}>
            {!session && 
                <>
                <Button href="/auth/login" className='underline'>Đăng nhập</Button>
                    <span>/</span>
                <Button href="/auth/signup" className='underline'>Đăng Ký</Button>
                </>
            }
            {
                session && <UserMenu data={session.user}/>
            }
            </div>
        </div>
    </nav>)
}