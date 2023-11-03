"use client"
import { useState } from 'react'
import styles from './user.module.scss'
import Link from 'next/link';
import { useForm } from "react-hook-form";
import { useSession } from "next-auth/react";
import isAuthencation from '@/untils/auth';
import axios from 'axios';
import Message from '@/components/Message/Message';
import { signOut } from "next-auth/react";

export default function User(){

    const { data: session, status, update } = useSession();
    const [message, setMessage] = useState({title: "", type:"warning"});
    isAuthencation(session);

    const [data, setData] = useState({
        _id: session.user._id,
        fullname: session.user?.fullname || "",
        email: session.user?.email,
        address: session.user?.address || "",
    });

    
    const [active, setActive] = useState({ui: "user", state: "show"});

    const { register, formState: { errors }, handleSubmit, watch} = useForm();

    let newpwd = watch("newpwd");


    const onSubmitPassword = (data) => {
        let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: 'http://localhost:3000/api/user/changePwd',
            headers: { 
                'Content-Type': 'application/json'
            },
            data : JSON.stringify({...data, _id: session.user._id})
            };
    
            axios.request(config)
            .then((response) => {
                if(response.status == 200) {
                    setMessage({title: "Đổi mật khẩu thành công", type: 'success'});
                }
            })
            .catch((error) => {
                setMessage({title: error.response.data.error, type: 'error'});
            });
    }


    const SubmitChangeInformation = (data) => {
        let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: 'http://localhost:3000/api/user/updateInformation',
        headers: { 
            'Content-Type': 'application/json'
        },
        data : JSON.stringify(data)
        };

        axios.request(config)
        .then((response) => {
            setData(response.data);
            update({...session, user: response.data})
        })
        .catch((error) => {
        console.log(error);
        });
    }



    return <div className={`${styles.container} mx-auto flex flex-grow`}>
        <div className={`flex basis-1/3 ${styles.userlist}`}>
            <ul>
                <li className={active.ui == "user" ? styles.active : ''} onClick={() => {
                                                                                        setActive((prevstate) => ({...prevstate, ui: "user"}))
                                                                                        setMessage({title: "", type:"warning"});
                                                                                        }}>Thông Tin Tài Khoản</li>
                <li className={active.ui == "pwd" ? styles.active : ''} onClick={() => {
                                                                                        setActive((prevstate) => ({...prevstate, ui: "pwd"}))
                                                                                        setMessage({title: "", type:"warning"});
                                                                                        }}>Mật khẩu</li>
                <li><button onClick={()=>{signOut()}}>Đăng xuất</button></li>
            </ul>
        </div>
        {active.ui == "user" && 
        <div className={`flex basis-2/3 ${styles.usershow}`}>
            <form onSubmit={handleSubmit(SubmitChangeInformation)}>
                <div className="">
                    <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-12">
                        <div className="md:col-span-12">
                            <label htmlFor="full_name">Họ và tên</label>
                            <input type="text" name="full_name" id="full_name" className={`h-10 border mt-1 rounded px-4 w-full bg-gray-50 ${active.state == 'show' && styles.show}`} value={data.fullname} onChange={(e) => {setData(prevState => ({...prevState, fullname: e.target.value}))}} disabled={active.state == 'show' || ''} />
                        </div>

                        <div className="md:col-span-12">
                            <label htmlFor="email">Email</label>
                            <input type="text" name="email" id="email" className={`h-10 border mt-1 rounded px-4 w-full bg-gray-50 ${active.state == 'show' && styles.show}`} value={data.email} onChange={(e) => {setData(prevState => ({...prevState, email: e.target.value}))}} disabled={active.state == 'show' || ''} placeholder="email@domain.com" />
                        </div>

                        <div className="md:col-span-12">
                            <label htmlFor="address">Địa chỉ</label>
                            <input type="text" name="address" id="address" className={`h-10 border mt-1 rounded px-4 w-full bg-gray-50 ${active.state == 'show' && styles.show}`} value={data.address} onChange={(e) => {setData(prevState => ({...prevState, address: e.target.value}))}} disabled={active.state == 'show' || ''} placeholder="" />
                        </div>
        
                        {
                            active.state == "show" && 
                            <div className="mt-2 md:col-span-5 text-right">
                                <div className="inline-flex items-end">
                                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                                    onClick={() =>setActive((prevstate) => ({...prevstate, state: "editnable"}))}
                                    >Chỉnh sửa
                                </button>
                                </div>
                            </div>
                        }

                        {
                            active.state == "editnable" && 
                            <div className="mt-2 md:col-span-5 text-right">
                                <div className="inline-flex items-end">
                                    <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                                        onClick={() =>{
                                            SubmitChangeInformation(data);
                                            setActive((prevstate) => ({...prevstate, state: "show"}));
                                        }}
                                        >Lưu thông tin</button>
                                </div>
                            </div>
                        }
                    </div>
                </div>
            </form>
        </div>}


        {active.ui == "pwd" && 
        <div className={`flex basis-2/3 ${styles.usershow}`}>
            <form onSubmit={handleSubmit(onSubmitPassword)}>
                <div class="lg:col-span-2">
                    <div class="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-5">
                        <div class="md:col-span-5">
                            <label htmlFor="pwd">Mật khẩu hiện tại</label>
                            <input type="password" id="pwd" class="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                                {...register("pwd", 
                                        {
                                            required: "Bạn chưa nhập mật khẩu",
                                            minLength: {value: 8, message: "Tối thiểu 8 ký tự"}
                                        }
                                
                                    )
                                } 
                            />
                        </div>
                        <div className='md:col-span-5'><Message type="warning">{errors.pwd && errors.pwd.message}</Message></div>
                        


                        <div class="md:col-span-5">
                            <label htmlFor="newpwd">Mật khẩu mới</label>
                            <input type="password" id="newpwd" class="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                                {...register("newpwd", 
                                        {
                                            required: "Bạn chưa nhập mật khẩu",
                                            minLength: {value: 8, message: "Tối thiểu 8 ký tự"}
                                        }
                                
                                    )
                                } 
                            />
                        </div>
                        <div className='md:col-span-5'><Message type="warning">{errors.newpwd && errors.newpwd.message}</Message></div>
                        

                        
                        <div class="md:col-span-5">
                            <label htmlFor="renewpwd">Mật khẩu xác nhận lại</label>
                            <input type="password" id="renewpwd" class="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                                {...register("renewpwd", 
                                        {
                                            required: "Bạn chưa nhập lại mật khẩu", 
                                            validate: value => value === newpwd || "Mật khẩu xác nhận không khớp"
                                        }
                                    )
                                } 
                            />
                        </div>
                        <div className='md:col-span-5'><Message type="warning">{errors.renewpwd && errors.renewpwd.message}</Message></div>
                        <div className='md:col-span-5'><Message type={message.type}>{message.title}</Message></div>
                
                        <div class="md:col-span-5 text-right">
                            <div class="inline-flex items-end">
                            <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Đổi mật khẩu</button>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </div>}
    </div>
}