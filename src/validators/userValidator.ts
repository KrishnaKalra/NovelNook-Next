
import { z } from "zod";


export const UserValidator = z.object({
    username: z.string().min(3, "Username must be at least 3 characters"),
    email: z.string().email("Invalid email format"),
    password: z.string().min(6, "Password must be at least 6 characters")
});

export type UserType = z.infer<typeof UserValidator>;
