import { configureStore } from "@reduxjs/toolkit";
import { Api } from "../Api/Api";
import { products } from "../Reducer";
export const store  = configureStore({
    reducer: {
        // user: slice.reducer,
        [Api.reducerPath]: Api.reducer,
        products: products.reducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(Api.middleware),
})