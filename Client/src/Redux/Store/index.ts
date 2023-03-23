import { modals, user } from "./../Reducer";
import { configureStore } from "@reduxjs/toolkit";
import { Api } from "../Api/Api";
import { product } from "../Reducer";
export const store = configureStore({
  reducer: {
    [Api.reducerPath]: Api.reducer,
    product: product.reducer,
    modals: modals.reducer,
    user: user.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(Api.middleware),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
