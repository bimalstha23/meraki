import { modals, user } from './../Reducer';
import { configureStore } from "@reduxjs/toolkit";
import { Api } from "../Api/Api";
import { products } from "../Reducer";
export const store = configureStore({
    reducer: {
        [Api.reducerPath]: Api.reducer,
        products: products.reducer,
        modals: modals.reducer,
        user: user.reducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }).concat(Api.middleware),
})