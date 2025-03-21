import mongoose, {Schema,Document,model} from 'mongoose';
import { User } from "./userModel";
interface IReview extends Document{
    title:string;
    author:string;
    isbn:string;
    userId:mongoose.Types.ObjectId;
    comment:string;
    reviewDate:Date;
}
export type {IReview};
const ReviewSchema=new Schema<IReview>({
    title:{
        type:String , required:true
    },
    author:{
        type:String , required:true
    },
    isbn:{
        type:String,required:true,
        length:13
    },
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'User'
    },
    comment:{
        type:String,
        required:true,
        minlength:50
    },
    reviewDate:{
        type:Date,
        required:true,
        default:Date.now
    }
});

const Review = mongoose.models.Review || mongoose.model<IReview>("Review", ReviewSchema);
export {Review};