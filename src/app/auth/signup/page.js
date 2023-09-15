import styles from './signup.module.scss'
import Link from 'next/link'
export default function Signup() {
    return  (
    <div className={styles.wrapper}>
        <div className={styles.container}>
            <form>
                <div className={styles.inputfield}>
                    <input className={styles.input} type="text" required/>
                    <label>Tài khoản</label>
                </div>
                <div className={styles.inputfield}>
                    <input className={`${styles.input} pswrd`} type="password" required/>
                    <label>Mật khẩu</label>
                </div>
                <div className={styles.inputfield}>
                    <input className={`${styles.input} pswrd`} type="password" required/>
                    <label>Nhập lại mật khẩu</label>
                </div>
                <div className={styles.inputfield}>
                    <input className={`${styles.input} pswrd`} type="password" required/>
                    <label>Email</label>
                </div>
                <div className={styles.button}>
                    <div className={styles.inner}></div>
                    <button>ĐĂNG KÝ</button>
                </div>
            </form>
            <div id="message"></div>
            <div className={styles.signup}>
                <Link href="/auth/login">Đăng nhập</Link>
                <br></br>
                <Link href='/'>Trở về trang chủ</Link>
            </div>
        </div>
    </div>   
 )
}