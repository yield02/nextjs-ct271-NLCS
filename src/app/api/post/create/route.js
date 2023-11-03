import { NextResponse } from "next/server";
import Post from "@/models/Post";
import Category from "@/models/Category";
import { authOptions } from "../../auth/[...nextauth]/route";
import { getServerSession } from "next-auth";

export async function POST(req, res) {
    const data = await req.json();
    const session = await getServerSession(authOptions);
    if(session.user._id === data.user._id) {
        const postData = {
            title: data.title,
            body: data.body,
            author: data.user._id,
            category: data.categoryID,
        }
        const post = new Post(postData);
        await post
            .save()
            .then(post => {
                Category.findOneAndUpdate({_id: data.categoryID}, {newPost: post._id, $inc: {numberPost: 1}});
                return NextResponse.json({post})
            })
            .catch(err => NextResponse.json({err: err}));
            
        await Category.findOneAndUpdate({_id: data.categoryID}, {newPost: post._id, $inc: {numberPost: 1}});
        return NextResponse.json(post);
    }
    return NextResponse.json({}, {status: 400});
}