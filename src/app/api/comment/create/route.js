import { NextResponse } from "next/server";
import Comment from "@/models/Comment";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";

export async function POST(req, res) {
    const data = await req.json();
    const session = await getServerSession(authOptions);
    if(session.user._id === data.user_id) {
        const commentData = {
            body: data.body,
            post_id: data.post_id,
            user_id: data.user_id 
        }
        const comment = new Comment(commentData);
        await comment
            .save()
            .then((comment) => {
                return NextResponse.json(comment);
            })
            .catch((error) => {
                return NextResponse.json(error, {status: 400});
            })
        return NextResponse.json(comment);
    }
    return NextResponse.json(comment, {status: 400});
}
