"use client"
import { useEffect, useState, useRef } from 'react';
import { useForm } from "react-hook-form";
import Link from 'next/link';
import { useRouter } from 'next/navigation';

import styles from './signup.module.scss';
import Message from '@/components/Message/Message';

export default function Signup() {
    const router = useRouter()
    const [message, setMessage] = useState({messageType: "danger", messageText: ""});
    const { register, formState: { errors },handleSubmit, watch} = useForm();

    let pwd = watch("pwd");

    let messageType = message.messageType;

    //handle Submit
    const onSubmit = (data) => {
        var requestOptions = {
            method: 'POST',
            body: JSON.stringify(data),
            redirect: 'follow'
          };
          
          fetch("http://localhost:3000/api/signup", requestOptions)
            .then(response => response.json())
            .then(result => {
                // Thông báo ở đây
                if(result.status === 'success') {
                    router.push("/auth/login");
                }
                else if(result.error) {
                    setMessage({...message, messageText: result.error})
                }
            })
            .catch(error => console.log('error', error));
    };
 

    return  (
    <div className={styles.wrapper}>
        <div className={styles.container}>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className={styles.inputfield}>
                    <input className={styles.input} type="text" 
                        {...register("username",
                                {
                                    required: "Bạn chưa nhập tài khoản", 
                                    minLength: {value: 5, message: "Tối thiểu 5 ký tự"}
                                }
                            )
                        }
                    />
                    <label>Tài khoản</label>
                </div>
                {errors.username && errors.username.message}
                <div className={styles.inputfield}>
                    <input className={`${styles.input} pswrd`} type="password" 
                        {...register("pwd", 
                                {
                                    required: "Bạn chưa nhập mật khẩu",
                                    minLength: {value: 8, message: "Tối thiểu 8 ký tự"}
                                }
                                
                            )
                        } 
                    />
                    <label>Mật khẩu</label>
                </div>
                {errors.pwd && errors.pwd.message}
                <div className={styles.inputfield}>
                    <input className={`${styles.input} pswrd`} type="password" 
                        {...register("rePwd", 
                                {required: "Bạn chưa nhập lại mật khẩu", validate: value => value === pwd || "Mật khẩu xác nhận không khớp"}
                            )
                        } 
                    />
                    <label>Nhập lại mật khẩu</label>
                </div>
                {errors.rePwd && errors.rePwd.message}
                <div className={styles.inputfield}>
                    <input className={`${styles.input} pswrd`} type="email" 
                        {...register("email", 
                                {required: "Bạn chưa nhập Email"}
                            )
                        } 
                    />
                    <label>Email</label>
                </div>
                {errors.email && errors.email.message}
                <div className={styles.button}>
                    <div className={styles.inner}></div>
                    <button onClick={handleSubmit}>ĐĂNG KÝ</button>
                </div> 
            </form>
            <div id={`message`}><Message type={messageType}>{message?.messageText}</Message></div>
            <div className={styles.signup}>
                <Link href="/auth/login">Đăng nhập</Link>
                <br></br>
                <Link href='/'>Trở về trang chủ</Link>
            </div>
        </div>
    </div>   
 )
}