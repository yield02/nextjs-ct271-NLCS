import styles from './Message.module.scss'

 
export default function Message({type, children}) {
    return <span className={styles[type]}>{children}</span>
}