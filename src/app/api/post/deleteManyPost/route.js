import { NextResponse } from "next/server";
import { authOptions } from "../../auth/[...nextauth]/route";
import { getServerSession } from "next-auth";

import Post from "@/models/Post";
import Category from "@/models/Category";


export async function POST(req, res) {
    const data = await req.json();

    const session = await getServerSession(authOptions);
    
    if(session.user._id && session.user._id === data.author_id) {
        const deleteMethodCount = await Post.deleteMany({_id: {$in: data.postsId}, author: data.author_id});

        if(deleteMethodCount) {
            return NextResponse.json(data, {status: 200});
        }
        else {
            return NextResponse.json(data, {status: 500});
        }
    }
    
    
    return NextResponse.json(data, {status: 400});
}