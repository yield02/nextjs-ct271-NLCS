import { NextResponse } from "next/server";
import { authOptions } from "../../auth/[...nextauth]/route";
import { getServerSession } from "next-auth";

import Post from "@/models/Post";
import Category from "@/models/Category";


export async function POST(req, res) {
    const data = await req.json();

    const session = await getServerSession(authOptions);
    
    // console.log(session.user._id, data.user_id, data.deleteTemp);

    if(session?.user?.isAdmin && data.manager == true) {

        const post = await Post.findOneAndDelete({_id: data._id});

        if(post) {
            const lastestPost = await Post.findOne({deleteAt: false, category: data.categoryID, "status.status": "allow"}, null, {sort: { createdAt: -1 }});
            
            if(lastestPost) {
                await Category.findOneAndUpdate({_id: post.category}, {newPost: lastestPost?._id, $inc: {numberPost: -1}});
            }
            else {
                await Category.findOneAndUpdate({_id: post.category}, {newPost: null, numberPost: 0});
            }
            return NextResponse.json(data, {status: 200});
        }
        else {
            return NextResponse.json(data, {status: 500});
        }
    }
    else if(session.user._id == data.user_id && data.deleteTemp) {
        console.log(data);
        const post = await Post.findOneAndUpdate({_id: data.post_id, deleteAt: false, author: data.user_id}, {deleteAt: true});
        
        if(post) {

            const lastestPost = await Post.findOne({deleteAt: false, category: data.categoryID, "status.status": "allow"}, null, {sort: { createdAt: -1 }});
            
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
    
    return NextResponse.json(data, {status: 400});
}