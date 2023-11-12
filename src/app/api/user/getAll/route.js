import { NextResponse } from "next/server";
import { authOptions } from "../../auth/[...nextauth]/route";
import { getServerSession } from "next-auth";

import User from "@/models/User";
import Post from "@/models/Post";


export async function POST(req, res) {
    const data = await req.json();

    const session = await getServerSession(authOptions);
    if(session?.user?._id && session?.user?.isAdmin == true) {
        console.log("[GET USER] admin mod");
        let users = await User.find()
                    .select({pwd: 0})
                    .sort({createdAt: data.sort})
                    .skip(data.page*10-10).limit(data.page*10)
                    .exec()
        users = await Promise.all(users.map(async (user) => {
            const totalPost = await Post.countDocuments({author: user._id});
            const warningTotal = await Post.countDocuments({author: user._id, "status.status": 'allow'});
            return {...user._doc, totalPost, warningTotal};
            }));
        return NextResponse.json(users);
    }
}