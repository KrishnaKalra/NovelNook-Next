
import mongoose from "mongoose";
import User  from "../models/userModel";
import { UserType } from "@/validators/userValidator";


export async function createUser(data: UserType) {
    try {
        const user = new User(data);
        await user.save();
        return user;
    } catch (error) {
        throw new Error(error.message);
    }
}


export async function getUsers() {
    return await User.find();
}


export async function getUserById(userId: string) {
    if (!mongoose.Types.ObjectId.isValid(userId)) {
        throw new Error("Invalid user ID");
    }
    return await User.findById(userId);
}

export async function updateUser(userId: string, data: Partial<UserType>) {
    if (!mongoose.Types.ObjectId.isValid(userId)) {
        throw new Error("Invalid user ID");
    }
    return await User.findByIdAndUpdate(userId, data, { new: true });
}


export async function deleteUser(userId: string) {
    if (!mongoose.Types.ObjectId.isValid(userId)) {
        throw new Error("Invalid user ID");
    }
    return await User.findByIdAndDelete(userId);
}
