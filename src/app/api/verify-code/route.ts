import  User  from "@/models/userModel";
import dbConnect from "../../../../libs/dbConnect";
import { verifyValidation } from "@/validators/veryifySchema";
import {z} from 'zod'
const VerifyBodySchema=z.object({
    code:verifyValidation
});

export async function POST(request:Request){
    dbConnect();
    
   

    //This is the actual code for verification but for sending Email to other we need a premium subscription i have made such that all random value will return true
    try {
     const {username,code}=await request.json();
     const decodedUsername=decodeURIComponent(username);

        const result=VerifyBodySchema.safeParse({code});
        //console.log(result);
        if(!result.success){
            const codeErrors=result.error.format().code?._errors||[];
            //console.log(result.error);
            return Response.json({
                success:false,
                message:codeErrors?.length>0?codeErrors.join(', '):'Invalid body params',
            },{status:400})
        }

        const user=await User.findOne({username:decodedUsername});
        if(!user){
            return Response.json(
            {
                success:false,
                message:"User not found"
            },
            {status:500}
            )
        }
        {//making all code true
            user.isVerified=true;
            await user.save();
            return Response.json({
            success:true,
            message:"Account Verified Successfully"
            },{
              status:200
            });
        }
    //     const isCodeValid=user.verifyCode===code;
    //     const isCodeNotExpired=new Date(user.verifyCodeExpiry)>new Date();
    //     if(isCodeValid&&isCodeNotExpired){
    //         user.isVerified=true;
    //         await user.save();
    //         return Response.json({
    //             success:true,
    //             message:"Account Verified Successfully"
    //         },{
    //             status:200
    //         })
    //     }else if(!isCodeNotExpired){
    //         return Response.json(
    //             {
    //                 success:false,
    //                 message:"Verification code has expired,please signup again to get a new code"
    //             },
    //             {status:400}
    //             )
    //     }
    //     else{
    //         return Response.json(
    //             {
    //                 success:false,
    //                 message:"Incorrect Verification code"
    //             },
    //             {status:400}
    //             ) 
    //     }
    } catch (error) {
        console.error("Error verifying user",error);
        return Response.json(
            {
                success:false,
                message:"Error verifying user"
            },
            {status:500}
        )
    }
}