import { NextAuthOptions } from 'next-auth';
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs"
import dbConnect from '../../../../../libs/dbConnect';
import User from '@/models/userModel';
export const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            id: "credentials",
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "text" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials: any): Promise<any> {
                await dbConnect();
                try {
                    const user= await User.findOne({
                        $or: [
                            { email: credentials.identifier },
                            { username: credentials.identifier }
                        ]
                    });
                    //console.log(user);
                    if (!user) {
                        //console.log('No user found with this email')
                        throw new Error('No user found with this email')
                    }
                    if (!user.isVerified) {
                        //console.log('Please verify your account before login')
                        throw new Error('Please verify your account before login')
                    }
                    const isPasswordCorrect = await bcrypt.compare(credentials.password, user.password);
                    if (isPasswordCorrect) {
                        return user;
                    } else {
                        //console.log('Incorrect Password')
                        throw new Error('Incorrect Password')
                    }


                } catch (error: any) {
                    throw new Error(error)
                }
            }
        })

    ],
    callbacks: {
        async session({ session, token }) {
            if(token){
                session.user._id=token._id;
                session.user.isVerified=token.isVerified;
                session.user.username=token.username;
            }
            return session
        },
        async jwt({ token, user }) {
            if(user){
                token._id=user._id?.toString();
                token.isVerified=user.isVerified;
                token.username=user.username;
            }
            return token
        }

    },
    pages: {
        signIn: '/sing-in'
    },
    session: {
        strategy: "jwt"
    },
    secret: process.env.NEXTAUTH_SECRET,

}