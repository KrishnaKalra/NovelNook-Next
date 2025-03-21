import { NextResponse } from "next/server";
import { getReviewById, updateReview, deleteReview } from "@/services/reviewService";
import dbConnect from "../../../../../libs/dbConnect";
import { getServerSession, User } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/options";

export async function GET(req: Request,props: { params: Promise<{ id: string }> }) {
    try {
        await dbConnect();
        const session = await getServerSession(authOptions)
        const user: User = session?.user as User;
        
        if (!session || !session.user) {
            return Response.json(
                {
                    success: false,
                    message: "Not Authenticated"
                },
                { status: 401 }
            )
        }
        
        const {id}=await props.params;
        console.log(id);
        const review = await getReviewById(id);
        return NextResponse.json(review);
    } catch (error) {
        return NextResponse.json({ error: (error as Error).message }, { status: 404 });
    }
}

export async function PUT(req: Request, props: { params: Promise<{ id: string }> }) {
    try {
        await dbConnect();
        const session = await getServerSession(authOptions)
        const user: User = session?.user as User;

        if (!session || !session.user) {
            return Response.json(
                {
                    success: false,
                    message: "Not Authenticated"
                },
                { status: 401 }
            )
        }
        const body = await req.json();
        const {id}=await props.params;
        console.log(body);
        console.log(id);
        const updatedReview = await updateReview(id, body);
        return NextResponse.json(updatedReview);
    } catch (error) {
        return NextResponse.json({ error: (error as Error).message }, { status: 400 });
    }
}

export async function DELETE(req: Request,  props: { params: Promise<{ id: string }> }) {
    try {
        await dbConnect();
        const session = await getServerSession(authOptions)
        const user: User = session?.user as User;

        if (!session || !session.user) {
            return Response.json(
                {
                    success: false,
                    message: "Not Authenticated"
                },
                { status: 401 }
            )
        }
        const {id}=await props.params;
        await deleteReview(id);
        return NextResponse.json({ message: "Review deleted successfully" });
    } catch (error) {
        return NextResponse.json({ error: (error as Error).message }, { status: 400 });
    }
}
