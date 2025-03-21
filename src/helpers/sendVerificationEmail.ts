
import VerificationEmail from "../../emails/VerificationEmail";
import { ApiResponse } from "@/types/ApiResponse";
import { resend } from "../../libs/resend";
import { Resend } from "resend";

 export async function sendVerificationEmail(
    email:string,
    username:string,
    verifyCode:string
 ):Promise<ApiResponse>{
    try{
        const { data, error } = await resend.emails.send({
            from: 'onboarding@resend.dev',
            to: email,
            subject: 'Mystry message | Verification code',
            react: VerificationEmail({username,otp:verifyCode}),
          });
        return {success:true,message:'Sent Verification Email'}
    }catch(emailError){
        console.error("Error sending verification Email",emailError);
        return {success:false,message:'Failed to send Verification Email'}
    }
 }