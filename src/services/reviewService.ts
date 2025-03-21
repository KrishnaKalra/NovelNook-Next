import mongoose from "mongoose";
import { Review, IReview } from "../models/reviewModel";

export const createReview = async (reviewData: Partial<IReview>) => {
    try {
        const review = new Review(reviewData);
        await review.save();
        return review;
    } catch (error) {
        throw new Error(`Failed to create review: ${(error as Error).message}`);
    }
};

export const getAllReviews = async (filter = {}) => {
    try {
        console.log('hi');
        return await Review.find(filter).populate("userId", "username email");
    } catch (error) {
        throw new Error(`Failed to get reviews: ${(error as Error).message}`);
    }
};

// ✅ Get a single review by ID
export const getReviewById = async (reviewId: string) => {
    if (!mongoose.Types.ObjectId.isValid(reviewId)) throw new Error("Invalid Review ID");
    return await Review.findById(reviewId).populate("userId", "username email");
};

// ✅ Update a review by ID
export const updateReview = async (reviewId: string, updateData: Partial<IReview>) => {
    if (!mongoose.Types.ObjectId.isValid(reviewId)) throw new Error("Invalid Review ID");

    const updatedReview = await Review.findByIdAndUpdate(reviewId, updateData, { new: true });

    if (!updatedReview) throw new Error("Review not found");

    return updatedReview;
};

// ✅ Delete a review by ID
export const deleteReview = async (reviewId: string) => {
    if (!mongoose.Types.ObjectId.isValid(reviewId)) throw new Error("Invalid Review ID");

    const deletedReview = await Review.findByIdAndDelete(reviewId);

    if (!deletedReview) throw new Error("Review not found");

    return deletedReview;
};
