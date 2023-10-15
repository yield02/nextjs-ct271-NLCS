import Link from 'next/link'
import styles from './MenuItem.module.scss'

export default function MenuItem({children, Icon, href, ...props}) {
    let Comp = "button";
    if(href) {
        Comp = Link;
    }

    return <Comp {...props} href={href} className={styles.container}>{Icon && <Icon className={styles.icon}></Icon>}{children}</Comp>
}


