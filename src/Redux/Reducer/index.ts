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

interface UserState {
    currentUser: any | null | {} | undefined;
    userDetails: any | {};
}

const initialState: UserState = {
    currentUser: null,
    userDetails: {},
}


export const user = createSlice({
    name: "user",
    initialState,
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
        cartDialog:false,
        addressDialog:false,
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
        },
        setAddressDialog:(state,action)=>{
            state.addressDialog = action.payload;
        }
    },

})






export const { setUserLoginDetails ,   } = user.actions;
export const { setCurrentProduct } = product.actions;
export const { setLoginDialog, setRegisterDialog,setCartDialog,setAddressDialog } = modals.actions;
