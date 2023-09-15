import styles from './login.module.scss'
import { FaFacebook } from "react-icons/fa6";
import Link from 'next/link';

export default function Login() {
    return  (
    <div className={styles.wrapper}>
        <div className={styles.container}>
            {/* <div className={styles.header}>Đăng Nhập</div> */}
            <form>
                <div className={styles.inputfield}>
                    <input className={styles.input} type="text" required/>
                    <label>Tài khoản</label>
                </div>
                <div className={styles.inputfield}>
                    <input className={`${styles.input} pswrd`} type="password" required/>
                    <label>Mật khẩu</label>
                </div>
                <div className={styles.button}>
                    <div className={styles.inner}></div>
                    <button>ĐĂNG NHẬP</button>
                </div>
            </form>
            <div className={styles.auth}>
            HOẶC
            </div>
            <div className={styles.links}>
                <div className={styles.facebook}>
                <FaFacebook className={styles.loginIcons}></FaFacebook><span>Facebook</span>
                </div>
                <div className={styles.google}>
                    <FaFacebook className={styles.loginIcons}></FaFacebook><span>Google</span>
                </div>
            </div>
            <div className={styles.signup}>
                <a href="/auth/signup">Đăng ký tài khoản</a>
                <br></br>
                <Link href='/'>Trở về trang chủ</Link>
            </div>
        </div>
    </div>   
 )
}