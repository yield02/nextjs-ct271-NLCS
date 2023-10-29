import { NextResponse } from "next/server";
import { authOptions } from "../../auth/[...nextauth]/route";
import { getServerSession } from "next-auth";

import Post from "@/models/Post";

export async function POST(req, res) {

    const data = await req.json();
    const session = await getServerSession(authOptions);
    if(session.user._id == data.user_id) {
        const post = await Post.findOneAndUpdate({_id: data.post_id, author: data.user_id}, {body: data.body, title: data.title});
        if(post) {
            return NextResponse.json(data, {status: 200});
        }
        else {
            return NextResponse.json(data, {status: 500});
        }
    }
    return NextResponse.json(data, {status: 400});
}