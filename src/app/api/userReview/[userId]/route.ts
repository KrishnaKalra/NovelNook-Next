import { NextResponse } from "next/server";
import dbConnect from "../../../../../libs/dbConnect"
import {  getAllReviews } from "@/services/reviewService";


export async function GET(req: Request,  props: { params: Promise<{ userId: string }>}) {
    try {
        await dbConnect();
        const {userId}=await props.params;
        const review = await getAllReviews({userId});
        return NextResponse.json(review);
    } catch (error) {
        return NextResponse.json({ error: (error as Error).message }, { status: 404 });
    }
}
