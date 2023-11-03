import { NextResponse } from "next/server";
import { authOptions } from "../../auth/[...nextauth]/route";
import { getServerSession } from "next-auth";

import Post from "@/models/Post";
import Category from "@/models/Category";


export async function POST(req, res) {
    const data = await req.json();

    const session = await getServerSession(authOptions);
    if(session.user._id == data.user_id) {
        const post = await Post.findOneAndUpdate({_id: data.post_id, deleteAt: false, author: data.user_id, status: "allow"}, {deleteAt: true});
        if(post) {
            const lastestPost = await Post.findOne({deleteAt: false, category: data.categoryID, status: "allow"}, null, {sort: { createdAt: -1 }});
            if(lastestPost) {
                await Category.findOneAndUpdate({_id: data.categoryID}, {newPost: lastestPost?._id, $inc: {numberPost: -1}});
            }
            else {
                await Category.findOneAndUpdate({_id: data.categoryID}, {newPost: null, numberPost: 0});
            }
            return NextResponse.json(data, {status: 200});
        }
        else {
            return NextResponse.json(data, {status: 500});
        }
    }
    
    return NextResponse.json(data, {status: 200});
}