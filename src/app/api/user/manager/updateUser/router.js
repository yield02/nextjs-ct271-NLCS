import { NextResponse } from "next/server";
import { authOptions } from "../../auth/[...nextauth]/route";
import { getServerSession } from "next-auth";

import User from "@/models/User";


export async function POST(req, res) {
    const data = await req.json();

    const session = await getServerSession(authOptions);
    if(session?.user?._id && session?.user?.isAdmin == true) {
        console.log("[UPDATE USER] admin mod");
        let user = await User.findOneAndUpdate({_id: data.user_id}, {status: status})
        if(user) {
            return NextResponse.json(user);
        }
        return NextResponse.json({error: "Lỗi query"}, {status: 400});
    }
}