import CategoryModel from "@/models/Category";
import { NextResponse } from "next/server";

export async function POST() {
    // const dataCategory = {
    //     category_name: "Kiến thức căn bản",
    //     description: "Thấu hiểu âm dương, ngũ hành để vận dụng vào các bộ môn như nhân tướng, tứ trụ,....",
    // }

    // // const dataPost = {
    // //     title: "Nhân tướng ứng dụng trong công việc",
    // //     body: "{test.....}", 
    // //     author: "65250dc19f3e6620e634457e",
    // //     category: "6528a92559a27da45b9ef257",
    // //     status: "test",
    // // } 
    // // category  
    // const test = new CategoryModel(dataCategory);
    // await test
    //     .save()
    //     .then(account => {
    //         return NextResponse.json({account});
    //     })
    //     .catch(error => {
    //         console.log(error);
    //         return NextResponse.json({error}, {status: 500})
    //     })

    //     // POST  
    
    // // const test = await Post.findOne({title: "Nhân tướng ứng dụng trong công việc"})
    // //                 .populate('author', ['username', 'email'])
    // //                 .exec();


    // // const query = CategoryModel.where({category_name: "Nhân tướng"});
    // // const test = await query.findOne().populate("posts");
    // console.log(test);
    // return NextResponse.json(test);
}