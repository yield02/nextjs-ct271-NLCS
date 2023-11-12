import { NextResponse } from "next/server";

import Comment from "@/models/Comment";

export async function POST(req, res) {

    const {sort, page, ...data} = await req.json();
    const comment = await Comment.find({post_id: data.post_id})
                    .populate('user_id', ['fullname', 'username', 'createdAt', 'email', 'isAdmin', 'role'])
                    .sort({createdAt: sort})
                    .skip(page*10-10).limit(page*10)
                    .exec();
    return NextResponse.json(comment);
}