import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "../../auth/[...nextauth]/route";
import User from "@/models/User";

export async function POST(req, res, next){
    const session = await getServerSession(authOptions);
    const data = await req.json(); 
    const {_id: user_id, ...updateData} = data;
    if(session?.user?._id === user_id) {
        const resData = await User.findOneAndUpdate({_id: user_id}, updateData, {new: true});
        session.user = data;
        return NextResponse.json(resData);
    }
    return NextResponse.json({error:"Có lỗi xảy ra"}, {status: 400})
}