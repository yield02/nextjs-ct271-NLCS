import { NextResponse } from "next/server";
import { authOptions } from "../../auth/[...nextauth]/route";
import { getServerSession } from "next-auth";

import Post from "@/models/Post";

export async function POST(req, res) {

    const data = await req.json();
    const session = await getServerSession(authOptions);

    if(session?.user?._id == data?.user_id && data.restore) {
        const post = await Post.findOneAndUpdate({_id: data._id, author: session?.user?._id}, {deleteAt: false});
        if(post) {
            const lastestPost = await Post.findOne({deleteAt: false, category: data.categoryID, status: "allow"}, null, {sort: { createdAt: 1 }});
            if(lastestPost) {
                await Category.findOneAndUpdate({_id: data.categoryID}, {newPost: lastestPost?._id, $inc: {numberPost: 1}});
            } 
            return NextResponse.json(data, {status: 200});
        }
        else {
            return NextResponse.json(data, {status: 500});
        }
    }
    else if(session?.user?.isAdmin && data?.manager) {
        // console.log(data);
        const post = await Post.findOneAndUpdate({_id: data._id}, {status: data.status});
        if(post) {
            return NextResponse.json(data, {status: 200});
        }
        else {
            return NextResponse.json(data, {status: 500});
        }
    }
    else if(session?.user?._id == data?.user_id) {
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