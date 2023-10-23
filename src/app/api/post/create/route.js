import { NextResponse } from "next/server";
import Post from "@/models/Post";


export async function POST(req, res) {
    const data = await req.json();

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
            return NextResponse.json({post})
        })
        .catch(err => NextResponse.json({err: err}))
    return NextResponse.json(post);
}