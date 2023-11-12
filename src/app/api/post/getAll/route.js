import { NextResponse } from "next/server";
import { authOptions } from "../../auth/[...nextauth]/route";
import { getServerSession } from "next-auth";

import Post from "@/models/Post";
import Comment from "@/models/Comment";


export async function POST(req, res) {

    const {sort, ...data} = await req.json();
    const session = await getServerSession(authOptions);
    // console.log(session?.user?._id, data?.user_id)
    // Select admin nè;
    if(session?.user?._id && session?.user?.isAdmin == true && data?.manager == true) {
        console.log("admin mod");
        let posts = await Post.find()
                    .populate('author', 'username')
                    .populate('category', 'category_name')
                    .sort({createdAt: sort})
                    .skip(data.page*10-10).limit(data.page*10)
                    .exec()
        let countPost = await Post.countDocuments({});
        return NextResponse.json({posts, totalPost: countPost});
    }
    // SELECT Author;
    else if(session?.user?._id && session?.user?._id == data?.user_id) {
        console.log("author mod");
        let posts = await Post.find({author: session?.user?._id, "status.status": {$ne: 'delete'}})
                    .populate('author', 'username')
                    .populate('category', 'category_name')
                    .sort({createdAt: sort})
                    .skip(data.page*10-10).limit(data.page*10)
                    .exec()
        let countPost = await Post.countDocuments({author: session?.user?._id, "status.status": {$ne: 'delete'}});
        return NextResponse.json({posts, totalPost: countPost});
    }
    // SELECT USER
    else {
        console.log("User mod");
        let posts = await Post.find({category: data.categoryID, deleteAt: false, "status.status": "allow"})
                    .populate('author', 'username')
                    .populate('category', 'category_name')
                    .sort({createdAt: sort})
                    .exec()
            posts = await Promise.all(posts.map(async (post) => {
            const totalComment = await Comment.countDocuments({post_id: post._id});
                return {...post._doc, totalComment};
                }));
        return NextResponse.json(posts);
    }
}