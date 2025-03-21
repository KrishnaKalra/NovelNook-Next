import mongoose, { Schema, Document, Model } from "mongoose";
import { UserType } from "@/validators/userValidator";

export interface IUser extends UserType, Document {
    createdAt: Date;
    verifyCode: string;
    verifyCodeExpiry: Date;
    isVerified: boolean;
}

const UserSchema = new Schema<IUser>({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    verifyCode: { type: String, required: [true, "Verify code is required"] },
    verifyCodeExpiry: { type: Date, required: [true, "Verify Code Expiry is required"] },
    createdAt: { type: Date, default: Date.now },
    isVerified: { type: Boolean, default: false, required: true }
});

// ✅ Corrected Type Assertion for Mongoose Caching
const User = (mongoose.models.User as Model<IUser>) || mongoose.model<IUser>("User", UserSchema);

export default User;
