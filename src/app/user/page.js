"use client"
import { useState } from 'react'
import styles from './user.module.scss'
import Link from 'next/link';
import { useForm } from "react-hook-form";

export default function User(){

    const [active, setActive] = useState({ui: "user", state: "show"});

    const { register, formState: { errors },handleSubmit, watch} = useForm();

    let newpwd = watch("newpwd");


    const onSubmitPassword = (data) => {

    }


    return <div className={`${styles.container} mx-auto flex flex-grow`}>
        <div className={`flex basis-1/3 ${styles.userlist}`}>
            <ul>
                <li className={active.ui == "user" ? styles.active : ''} onClick={() => setActive((prevstate) => ({...prevstate, ui: "user"}))}>Thông Tin Tài Khoản</li>
                <li className={active.ui == "pwd" ? styles.active : ''} onClick={() =>setActive((prevstate) => ({...prevstate, ui: "pwd"}))}>Mật khẩu</li>
                <li><Link href={'/'}>Đăng xuất</Link></li>
            </ul>
        </div>
        {active.ui == "user" && 
        <div className={`flex basis-2/3 ${styles.usershow}`}>
            <div className="lg:col-span-2">
                <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-5">
                    <div className="md:col-span-5">
                        <label htmlFor="full_name">Họ và tên</label>
                        <input type="text" name="full_name" id="full_name" className="h-10 border mt-1 rounded px-4 w-full bg-gray-50" value="" disabled={active.state == 'show' || ''} />
                    </div>

                    <div className="md:col-span-5">
                        <label htmlFor="email">Email</label>
                        <input type="text" name="email" id="email" className="h-10 border mt-1 rounded px-4 w-full bg-gray-50" value="" disabled={active.state == 'show' || ''} placeholder="email@domain.com" />
                    </div>

                    <div className="md:col-span-3">
                        <label htmlFor="address">Địa chỉ</label>
                        <input type="text" name="address" id="address" className="h-10 border mt-1 rounded px-4 w-full bg-gray-50" value="" disabled={active.state == 'show' || ''} placeholder="" />
                    </div>

                    <div className="md:col-span-2">
                        <label htmlFor="city">Thành Phố</label>
                        <input type="text" name="city" id="city" className="h-10 border mt-1 rounded px-4 w-full bg-gray-50" value="" disabled={active.state == 'show' || ''} placeholder="" />
                    </div>
      
                    {
                        active.state == "show" && 
                        <div className="md:col-span-5 text-right">
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
                        <div className="md:col-span-5 text-right">
                            <div className="inline-flex items-end">
                                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                                    onClick={() =>setActive((prevstate) => ({...prevstate, state: "show"}))}
                                    >Lưu thông tin</button>
                            </div>
                        </div>
                    }
                </div>
            </div>
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
                        <div className='md:col-span-5'>{errors.pwd && errors.pwd.message}</div>
                        


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
                        <div className='md:col-span-5'>{errors.newpwd && errors.newpwd.message}</div>
                        

                        
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
                        <div className='md:col-span-5'>{errors.renewpwd && errors.renewpwd.message}</div>

                
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