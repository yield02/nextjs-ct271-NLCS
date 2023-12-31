"use client"

import { FaFacebook } from "react-icons/fa6";
import Link from 'next/link';
import { useForm } from "react-hook-form";
import { getSession } from "next-auth/react";
import { useRouter } from 'next/navigation';
import { ToastContainer, toast } from 'react-toastify';

import { signIn } from "next-auth/react";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";

import styles from './login.module.scss'
import Message from "@/components/Message/Message";

export default function Login() {

    const router = useRouter();
    const { data: session, status } = useSession();
    
    useEffect(()=> {
        if(session) {
            router.push('/');
        }
    }, [])

    



    const { register, formState: { errors },handleSubmit, watch} = useForm();

    const [message, setMessage] = useState("");


    const onSubmit = async (data) => {
        
        const jsondata = JSON.stringify(data);
        const req = await signIn('credentials', {redirect: false, data: jsondata});
        if(req.error) {
            if(req.error == "CredentialsSignin") {
                setMessage("Vui lòng kiểm tra lại tài khoản và mật khẩu");
            }
            else {
                setMessage("Tài khoản của bạn đã bị khóa vui lòng liên hệ admin");
            }
        }
        else {
            if(session?.user?.username) {
                // console.log("OK");
                toast.success("Đăng nhập với ", session?.user?.username);
            }
            router.push('/');
        }
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
                <div className={styles.button}>
                    <div className={styles.inner}></div>
                    <button>ĐĂNG NHẬP</button>
                </div>
                <Message type={"error"} >{message}</Message>
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