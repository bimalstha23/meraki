import { configureStore } from "@reduxjs/toolkit";
import { Api } from "../Api/Api";

export const store  = configureStore({
    reducer: {
        // user: slice.reducer,
        [Api.reducerPath]: Api.reducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(Api.middleware),
    
})