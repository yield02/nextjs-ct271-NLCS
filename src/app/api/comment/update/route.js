import { NextResponse } from "next/server";
import { authOptions } from "../../auth/[...nextauth]/route";
import { getServerSession } from "next-auth";

import Comment from "@/models/Comment";

export async function POST(req, res) {

    const data = await req.json();
    const session = await getServerSession(authOptions);
    if(session.user._id == data.user_id) {
        const comment = await Comment.findOneAndUpdate({_id: data._id, user_id: data.user_id}, {body: data.body});
        if(comment) {
            return NextResponse.json(data, {status: 200});
        }
        else {
            return NextResponse.json(data, {status: 500});
        }
    }
    return NextResponse.json(data, {status: 400});
}