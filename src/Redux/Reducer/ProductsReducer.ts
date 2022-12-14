import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";


export const getProducts = createAsyncThunk(
    'Products/getProducts',
    async () => {
        const res = await axios({
            method: "GET",
            url: 'http://localhost:3000/products'
        })
        return res.data
    }
)

export const getProductSlice = createSlice({
    name: "Products",
    initialState: {
        products: [] as any,
        status: 'idle',
        filteredProducts:[] as any
    },

    reducers: {
        filterProductsbyCategory: (state, action) => {
            state.filteredProducts = state.products.filter((product :any) => {
                return product?.Category?.name === action.payload
            })
        },
        filterProductsbyPrice: (state, action) => {
            state.filteredProducts = state.products.filter((product :any) => {
                return product.price <= action.payload
            })
        },
        filterProductsbyRating: (state, action) => {
            state.filteredProducts = state.products.filter((product :any) => {
                return product.rating >= action.payload
            })
        },
        filterProductsbySearch: (state, action) => {
            state.filteredProducts = state.products.filter((product :any) => {
                return product.name.toLowerCase().includes(action.payload.toLowerCase())
            })
        },

        sortProductsbyrating: (state) => {
            state.filteredProducts = state.filteredProducts.sort((a:any,b:any) => b.rating - a.rating)
        },

        sortProductsbyPriceAsc: (state) => {
            state.filteredProducts = state.filteredProducts.sort((a:any,b:any) => a.price - b.price)
        },
        sortProductsbyPriceDesc: (state) => {
            state.filteredProducts = state.filteredProducts.sort((a:any,b:any) => b.price - a.price)
        },

    },
    extraReducers: (builder) => {
        builder
            .addCase(getProducts.pending, (state) => {
                state.status = 'loading'
            })
            .addCase(getProducts.fulfilled, (state, action) => {
                state.status = 'success'
                state.products = action.payload
                state.filteredProducts = action.payload
            })
            .addCase(getProducts.rejected, (state) => {
                state.status = 'failed'
            })
    }

})

export const { sortProductsbyrating,sortProductsbyPriceAsc,sortProductsbyPriceDesc, filterProductsbyCategory} = getProductSlice.actions;