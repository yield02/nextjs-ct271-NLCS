import styles from './Footer.module.scss'
import Image from 'next/image'
import Link from 'next/link'
import { AiOutlineFacebook, AiOutlineTwitter } from "react-icons/ai";
export default function Footer(){
    return (
    <footer className={`${styles.container} mx-auto flex-grow`}>
        {/* <div className='basis-1/4 flex flex-col'> */}
        <div className='flex flex-col items-center'>
            <Link href='/' className={styles.icon} >
                <Image src="/header/header-icon.png" width={160} height={160} alt='header-icon'></Image>
            </Link> 
            <div className={styles.description}>
                <p>Diễn đàn nơi có thể trao đổi những kiến thức về huyền học.</p>
            </div>
            <div className='flex'>
                <Link href="/" className={styles.linkIcon}>
                    <AiOutlineFacebook></AiOutlineFacebook>
                </Link>
                <Link href='/' className={styles.linkIcon}>
                    <AiOutlineTwitter></AiOutlineTwitter>
                </Link>
            </div>
        </div>
        {/* <div className='basis-1/4'></div>
        <div className='basis-1/4'></div>
        <div className='basis-1/4'></div> */}
    </footer>)
}