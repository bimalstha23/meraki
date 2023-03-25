import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        slug: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        price: {
            type: Number,
            required: true,
        },
        category: {
            type: String,
            // ref: "Category",
            required: true,
        },
        quantity: {
            type: Number,
            required: true,
        },
        tags: {
            type: Array,
        },
        Image: {
            type: Array,
            // contentType: String,
        },
        numReviews: {
            type: Number,
        },
        rating: {
            type: Number,
        },
        shipping: {
            type: Boolean,
        },
    },
    { timestamps: true }
);

export default mongoose.model("Products", productSchema);
