import { createSlice } from "@reduxjs/toolkit";

export const slice = createSlice({
    name: "user",
    initialState: {
        user: null,
    },
    reducers: {
        setUserLoginDetails: (state, action) => {
            state.user = action.payload;
        },
    },
});

export const products = createSlice({
    name: "products",
    initialState: {
        currentProduct: [],
    },
    reducers: {
        setCurrentProduct: (state, action) => {
            state.currentProduct = action.payload;
        }
    },
});

export const { setUserLoginDetails } = slice.actions;
export const { setCurrentProduct } = products.actions;

