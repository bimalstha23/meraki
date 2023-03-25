import mongoose from "mongoose";

const fuserSchema = new mongoose.Schema(
    {
        displayName: {
            type: String,
            required: true,
            trim: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        photoURL: {
            type: String,
            required: true,
        },
        uid: {
            type: String,
            required: true,
            unique: true,
        },
        role: {
            type: Number,
            default: 0,
        },
    },
    { timestamps: true }
);

export default mongoose.model("Fusers", fuserSchema);
