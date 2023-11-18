import { NextResponse } from "next/server";
import { authOptions } from "../../auth/[...nextauth]/route";
import { getServerSession } from "next-auth";

import Comment from "@/models/Comment";


export async function POST(req, res) {
    const data = await req.json();
    const session = await getServerSession(authOptions);
    if(session?.user?.isAdmin) {
        const comment = await Comment.findOneAndDelete({_id: data._id});
        if(comment) {
            return NextResponse.json({message: "xóa thành công"}, {status: 200});
        }
        else {
            return NextResponse.json({message: "xóa thành công"}, {status: 400});
        }
    }
    else {
        const comment = await Comment.findOneAndDelete({_id: data._id, user_id: session.user._id});
        if(comment) {
            return NextResponse.json({message: "xóa thành công"}, {status: 200});
        }
        else {
            return NextResponse.json({message: "xóa thành công"}, {status: 400});
        }
    }
    
}