import {z} from "zod";

export const usernameValidation=z
.string()
.min(2,"Username mmust be atleast 2 characters")//min len must be 2
.max(20,"Username cannot be more than 20 characters")//cannot be more than 20 char
.regex(/^[a-zA-Z0-9]+$/,"Username must not contain special character")


export const signUpSchema=z.object({
    username:usernameValidation,
    email: z.string().email({message:'Invalid email address'}),
    password:z.string().min(6,{message:'Password must be 6 character long'})
})