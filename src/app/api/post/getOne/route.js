import { NextResponse } from "next/server";
import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import { getServerSession } from "next-auth";

import Post from "@/models/Post";

export async function POST(req, res) {

    const data = await req.json();
    const session = await getServerSession(authOptions);
    if(session?.user?.isAdmin) {
        const post = await Post.findOne({_id: data.postID})
        .populate('author', ['username', 'fullname'])
        .populate('category', 'category_name')
        .exec();
        return NextResponse.json(post);
    }
    else {

        let post = await Post.findOne({_id: data.postID, author: data?.user_id})
        .populate('author', ['username', 'fullname'])
        .populate('category', 'category_name')
        .exec();
        if(post) return NextResponse.json(post);

        post = await Post.findOne({_id: data.postID, deleteAt: false, status: { status: 'allow', reason: ''}})
        .populate('author', ['username', 'fullname'])
        .populate('category', 'category_name')
        .exec();
        return NextResponse.json(post);
    }
}