import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { z } from "zod";

import User from "@/models/User";

const UserValidate = z.object({
    username: z.string().min(5),
    pwd: z.string().min(10),
    email: z.string().email()
})

export async function POST(req, res) {
    const data = await req.json();

    //Check User Exists
    let id = await User.exists({username: data.username}); 
    if(id) {
        return NextResponse.json({error: "Tài khoản này đã tồn tại"}, {status: 200});
    }

    // Hasched PASSWORD
    const hashedPassword = bcrypt.hashSync(data.pwd, 10);
    const newData = {
        ...data,
        pwd: hashedPassword
    }

    //Create Account
    const acc = new User(newData);
    await acc
        .save()
        .then(account => {
            return NextResponse.json({account});
        })
        .catch(error => NextResponse.json({error}, {status: 500}))

    return NextResponse.json({message: 'Tạo tài khoản thành công', status: 'success'}, {status: 200});
}   