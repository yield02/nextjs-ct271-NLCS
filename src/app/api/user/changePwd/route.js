import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "../../auth/[...nextauth]/route";
import User from "@/models/User";
import bcrypt from "bcrypt";

export async function POST(req, res, next){
    //Trang này có vấn đề: Query User 2 lần sẽ fix sau ^^
    
    
    const session = await getServerSession(authOptions);
    const data = await req.json(); 
    
    const query = User.where({_id: data?._id});
    const user = await query.findOne();

    if(session?.user?._id === data._id && user && (await bcrypt.compare(data.pwd, user.pwd))) {
        if(data?.newpwd === data?.renewpwd) {
            const hashedPassword = bcrypt.hashSync(data?.newpwd, 10);
            await User.findOneAndUpdate({_id: data._id}, {pwd: hashedPassword});
            return NextResponse.json({}, {status: 200});
        }
        else {
            return NextResponse.json({error:"mật khẩu xác thực không đúng"}, {status: 400})
        }
    }

    return NextResponse.json({error:"Mật khẩu cũ không đúng"}, {status: 400})
}