import Post from "@/models/Post";
import { NextResponse } from "next/server";

export async function POST(req, res) {
    const data = await req.json();
    // const test = await Post.findOne({title: "Nhân tướng ứng dụng trong công việc"})
    //                 .populate('author', ['username', 'email'])
    //                 .exec();
    return NextResponse.json(data);
}