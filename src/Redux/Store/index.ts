import { configureStore } from "@reduxjs/toolkit";
import { categoryApi } from "../Api/CategoryApi";


export const store  = configureStore({
    reducer: {
        // user: slice.reducer,
        [categoryApi.reducerPath]: categoryApi.reducer,
    
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(categoryApi.middleware),
})