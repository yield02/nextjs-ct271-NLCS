import CategoryModel from "@/models/Category";
import { NextResponse } from "next/server";

export async function POST() {
    
    const categories = await CategoryModel.find({})
                            .populate('newPost', 'title')
                            .exec();
    return NextResponse.json(categories);
}