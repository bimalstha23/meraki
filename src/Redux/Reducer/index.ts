import { doc, getDoc } from 'firebase/firestore';
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { buyerDb } from '../../config/firebase';


export const getUserDetails = createAsyncThunk(
    'user/getUserDetails',
    async (uid:any) => {
            const userRef = doc(buyerDb, "users", uid);
            const docSnap = await getDoc(userRef);
            if (docSnap.exists()) {
                return docSnap.data()
            }
            else {
                return null
            }
    }
)


export const user = createSlice({
    name: "user",
    initialState: {
        currentUser: null,
        userDetails:{} as any
    },
    reducers: {
        setUserLoginDetails: (state, action) => {
            state.currentUser = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getUserDetails.fulfilled, (state, action) => {
                state.userDetails = action.payload;
            })
    }
});


export const product = createSlice({
    name: "product",
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
        cartDialog:false
    },
    reducers: {
        setLoginDialog: (state, action) => {
            state.loginDialog = action.payload;
        },
        setRegisterDialog: (state, action) => {
            state.RegisterDialog = action.payload;
        },
        setCartDialog:(state,action)=>{
            state.cartDialog = action.payload;
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







export const { setUserLoginDetails ,   } = user.actions;
export const { setCurrentProduct } = product.actions;
export const { setLoginDialog, setRegisterDialog,setCartDialog } = modals.actions;
