import { NextResponse } from "next/server";
import { createReview, getAllReviews } from "@/services/reviewService";
import { ReviewSchema } from "@/validators/reviewValidator";
import mongoose from "mongoose";
import dbConnect from "../../../../libs/dbConnect";
import { getServerSession, User } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/options";
export async function GET() {
    try {
        await dbConnect();
        const session=await getServerSession(authOptions)

        if(!session||!session.user){
            return Response.json(
                {
                    success:false,
                    message:"Not Authenticated"
                },
                {status:401}
            )
        }
        const reviews = await getAllReviews();
        return NextResponse.json(reviews);
    } catch (error) {
        return NextResponse.json({ error: (error as Error).message }, { status: 500 });
    }
}

export async function POST(req: Request) {
    try {
        const session=await getServerSession(authOptions)

        if(!session||!session.user){
            return Response.json(
                {
                    success:false,
                    message:"Not Authenticated"
                },
                {status:401}
            )
        }
        
        await dbConnect();
        
        let body = await req.json();
        //console.log(body);
        let parsedData = ReviewSchema.parse(body); 
        if (!mongoose.Types.ObjectId.isValid(parsedData.userId)) {
            throw new Error("Invalid userId format");
        }

        const newReview = await createReview({...parsedData,userId:new mongoose.Types.ObjectId(parsedData.userId),reviewDate:new Date()});
        return NextResponse.json(newReview, { status: 201 });
    } catch (error) {
        return NextResponse.json({ error: (error as Error).message }, { status: 400 });
    }
}
