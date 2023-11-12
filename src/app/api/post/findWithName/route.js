import { NextResponse } from "next/server";
import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import { getServerSession } from "next-auth";
import Post from "@/models/Post";


export async function POST(req, res) {
    const data = await req.json();
    
    const session = await getServerSession(authOptions);
    if(session.user.isAdmin && data.manager) {
        
        const post = await Post.find({title: { $regex: '.*' + data.name + '.*' }})
                    .populate('author', ['username', 'fullname'])
                    .populate('category', 'category_name')
                    .exec();
        
        return NextResponse.json(post);
    }

    else {
        const post = await Post.find({title: { $regex: '.*' + data.name + '.*' }, deleteAt: false})
                    .populate('author', ['username', 'fullname'])
                    .populate('category', 'category_name')
                    .exec();
        return NextResponse.json(post);
    }
}