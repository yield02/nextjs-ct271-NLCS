import CategoryModel from "@/models/Category";
import { NextResponse } from "next/server";

export async function GET() {
    // const Category = new CategoryModel();
    const categories = await CategoryModel.find();
    return NextResponse.json(categories);
}