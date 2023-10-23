import { NextResponse } from "next/server";
import CategoryModel from "@/models/Category";

export async function POST(req, res) {
    const data = await req.json();

    const category = await CategoryModel.findOne({_id: data.id});

    return NextResponse.json(category);
}