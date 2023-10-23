import { NextResponse } from "next/server";

import Post from "@/models/Post";

export async function POST(req, res) {

    const data = await req.json();

    const post = await Post.findOne({_id: data.postID})
                    .populate('author', ['username', 'fullname'])
                    .populate('category', 'category_name')
                    .exec();

    return NextResponse.json(post);
}