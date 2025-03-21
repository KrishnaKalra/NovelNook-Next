import { NextResponse } from "next/server";
import { createUser, getUserById } from "@/services/userService";
import mongoose from "mongoose";
import dbConnect from "../../../../libs/dbConnect";
import  User  from "@/models/userModel";
import { UserValidator } from "@/validators/userValidator";
import bcrypt from "bcryptjs";
import { sendVerificationEmail } from "@/helpers/sendVerificationEmail";
// export async function POST(req: Request) {
//     try {
//         await dbConnect();
//         const body = await req.json();
//         const parsedData = UserValidator.parse(body); 

//         const newUser = await createUser(parsedData);
//         return NextResponse.json(newUser, { status: 201 });
//     } catch (error) {
//         return NextResponse.json({ error: (error as Error).message }, { status: 400 });
//     }
// }
export async function GET(req:Request){
    try {
        await dbConnect();

        const User = await getUserById('67d9d932013bd2b4712d23cb');
        return NextResponse.json(User, { status: 201 });
    } catch (error) {
        return NextResponse.json({ error: (error as Error).message }, { status: 400 });
    }
}
export async function POST(request:Request){
    await dbConnect();
    try{
        const {username,email,password}= await request.json();

        const existingUserVerifiedByUsername=await User.findOne({
            username,
            isVerified:true
        })

        if(existingUserVerifiedByUsername){
            return Response.json({
                success:false,
                message:"Username is already taken"
            },{status:400});
        }
        
        const existingUserByEmail=await User.findOne({
            email
        });
        const verifyCode=Math.floor(10000+Math.random()*90000).toString();
        if(existingUserByEmail){
            if(existingUserByEmail.isVerified){
                return Response.json({
                    success:false,
                    message:"User already exist with this email"
                },{status:400})
            }
            else{
                const hashedPassword=await bcrypt.hash(password,10);
                existingUserByEmail.password=hashedPassword;
                existingUserByEmail.verifyCode=verifyCode;
                existingUserByEmail.verifyCodeExpiry=new Date(Date.now()+3600000);
                await existingUserByEmail.save();
            }
        }else{
            const hashedPassword=await bcrypt.hash(password,10);
            const expiryDate=new Date();
            expiryDate.setHours(expiryDate.getHours()+1);
            const newUser=new User({
                username,
                email,
                password:hashedPassword,
                verifyCode,
                verifyCodeExpiry:expiryDate,
                isVerified:false
            })
            await newUser.save();
        }

        //sendVerification email
        const emailResponse=await sendVerificationEmail(
            email,username,verifyCode
        );
        if(!emailResponse.success){
            return Response.json({
                success:false,
                message:emailResponse.message
            },{status:500})
        }

        return Response.json({
            success:true,
            message:"User registered Successfully.Please verify your email"
        }
        )

    }catch(error){
        console.error('Error registering User',error);
        return Response.json(
            {
                success:false,
                message:"error registering user"
            },
            {
                status:500
            }
        )
    }
}