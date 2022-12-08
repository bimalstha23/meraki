import { createSlice } from "@reduxjs/toolkit";




export const slice = createSlice({
    name:"user",
    initialState: {
        user: null,
    },
    reducers: {
        setUserLoginDetails: (state, action) => {
            state.user = action.payload;
        },
        
    },
});

export const { setUserLoginDetails } = slice.actions;


