import { createSlice } from "@reduxjs/toolkit";

export const user = createSlice({
    name: "user",
    initialState: {
        currentUser: null,
    },
    reducers: {
        setUserLoginDetails: (state, action) => {
            state.currentUser = action.payload;
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

export const modals = createSlice({
    name: "modals",
    initialState: {
        loginDialog: false,
        RegisterDialog: false,
    },
    reducers: {
        setLoginDialog: (state, action) => {
            state.loginDialog = action.payload;
        },
        setRegisterDialog: (state, action) => {
            state.RegisterDialog = action.payload;
        }
    },

})

const cartSlice = createSlice({
    name: "cart",
    initialState: {
        cartItems: [],
    },
    reducers: {
        addToCart: (state, action) => {
            
        }
    }
})



export const { setUserLoginDetails  } = user.actions;
export const { setCurrentProduct } = products.actions;
export const { setLoginDialog, setRegisterDialog } = modals.actions;
