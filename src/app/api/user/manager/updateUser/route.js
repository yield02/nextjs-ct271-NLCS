import { NextResponse } from "next/server";
import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import { getServerSession } from "next-auth";

import User from "@/models/User";


export async function POST(req, res) {
    const data = await req.json();
    const session = await getServerSession(authOptions);
    if(session?.user?._id && session?.user?.isAdmin == true) {
        console.log("[UPDATE USER] admin mod");
        console.log(data);
        let user = await User.findOneAndUpdate({_id: data._id}, {status: data.status})
        if(user) {
            return NextResponse.json(user);
        }
        return NextResponse.json({error: "Lỗi query"}, {status: 400});
    }
    else {
        return NextResponse.json({error: "Bạn không có quyền truy cập!!"}, {status: 400});
    }
}