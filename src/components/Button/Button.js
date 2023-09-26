import styles from './Button.module.scss'
import Link from 'next/link';


export default function Button({children, className='', ...props}) {
    let Comp = "button";
    if(props.href) {
        Comp = Link;
    }



    return <Comp className={`${styles.button} ${styles.className}`} {...props} role="button">{children}</Comp>
}


