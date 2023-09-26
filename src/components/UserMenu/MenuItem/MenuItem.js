import Link from 'next/link'
import styles from './MenuItem.module.scss'

export default function MenuItem({children, Icon, href}) {
    return <Link href={href} className={styles.container}>{Icon && <Icon className={styles.icon}></Icon>}{children}</Link>
}


