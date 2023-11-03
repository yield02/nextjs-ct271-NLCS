import { NextResponse } from "next/server";

import Post from "@/models/Post";


export async function POST(req, res) {

    const {sort, ...data} = await req.json();

    const posts = await Post.find({category: data.categoryID, deleteAt: false, status: "allow"})
                    .populate('author', 'username')
                    .populate('category', 'category_name')
                    .sort({createdAt: sort})
                    .exec();
    return NextResponse.json(posts);
}