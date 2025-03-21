import mongoose, { Schema, Document, model } from 'mongoose';

interface IReview extends Document {
    title: string;
    author: string;
    isbn: string;
    userId: mongoose.Types.ObjectId;
    comment: string;
    reviewDate: Date;
}

// Export type for external usage
export type { IReview };

const ReviewSchema = new Schema<IReview>({
    title: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    isbn: {
        type: String,
        required: true,
        minlength: 13, // ✅ Ensures exactly 13 characters
        maxlength: 13
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User' // ✅ Reference to User model
    },
    comment: {
        type: String,
        required: true,
        minlength: 50
    },
    reviewDate: {
        type: Date,
        required: true,
        default: () => Date.now() // ✅ Ensures fresh timestamp
    }
});

// ✅ Ensures correct type when defining the Mongoose model
const Review = mongoose.models.Review as mongoose.Model<IReview> || mongoose.model<IReview>("Review", ReviewSchema);

export { Review };
