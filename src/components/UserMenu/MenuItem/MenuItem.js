import Link from 'next/link'
import styles from './MenuItem.module.scss'

export default function MenuItem({children, Icon, ...props}) {
    let Comp = "button";
    if(props.href) {
        Comp = Link;
    }

    return <Comp {...props} className={styles.container}>
            {Icon && <Icon className={styles.icon}></Icon>}
                {children}
            </Comp>
}


