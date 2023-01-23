import mongoose from "mongoose";
import User from "./user.interface";

const userSchema = new mongoose.Schema(
    {
        email: String,
        firstName: String,
        lastName: String,
        password: {
            type: String,
            get: (): undefined => undefined,
        },
    },
    {
        toJSON: {
            virtuals: true,
            getters: true,
        },
    },
);

userSchema.virtual('fullName').get(function () {
    return `${this.firstName} ${this.lastName}`;
});

userSchema.virtual('posts', {
    ref: 'Post',
    localField: '_id',
    foreignField: 'author',
});

const userModel = mongoose.model<User & mongoose.Document>('User', userSchema);

export default userModel;