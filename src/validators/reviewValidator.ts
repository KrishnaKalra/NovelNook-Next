import z from "zod";

// ✅ User ID must be a valid MongoDB ObjectId format
const objectIdRegex = /^[0-9a-fA-F]{24}$/;

// Review Validation Schema
export const ReviewSchema = z.object({
    title: z.string().min(1, "Book title is required"),
    author: z.string().min(1, "Author name is required"),
    isbn: z.string().length(13, "ISBN must be exactly 13 characters"),
    userId: z.string().regex(objectIdRegex, "Invalid userId format"), 
    comment: z.string().min(50, "Comment must be at least 50 characters").optional()
});

// TypeScript Types
export type ReviewType = z.infer<typeof ReviewSchema>;