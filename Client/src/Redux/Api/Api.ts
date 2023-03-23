import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  category,
  Comment,
  product,
  filter,
  // cart
} from "../../types";
export const Api = createApi({
  reducerPath: "Api",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3000/api/v1/" }),
  tagTypes: ["cart", "product", "address"],

  endpoints: (builder) => ({
    getProducts: builder.query<product[], filter>({
      query: (filter) => {
        if (filter.category) {
          return `products?_page=${filter.page}&_limit=9&q=${filter.searchQuery}&Category=${filter.category}&_sort=${filter.sortby}&_order=${filter.sortOrder}`;
        } else
          return `products?_page=${filter.page}&_limit=9&q=${filter.searchQuery}&_sort=${filter.sortby}&_order=${filter.sortOrder}`;
      },
    }),

    addUser: builder.mutation<any, any>({
      query: (data: any) => {
        return {
          url: `auth/add-user`,
          method: "POST",
          body: data,
        };
      },
    }),

    getCategories: builder.query<category[], void>({
      query: () => `categories`,
    }),

    getFeaturedProducts: builder.query<product[], void>({
      query: () => `featuredProducts`,
    }),

    getSingleProduct: builder.query({
      query: (id) => `products/${id}`,
    }),

    getCommentsOfProduct: builder.query<Comment[], string | number | undefined>(
      {
        query: (id) => `products/${id}/comments/`,
      }
    ),

    getCartItems: builder.query<any, any>({
      query: (uid) => `user/${uid}/cart/`,
      providesTags: ["cart"],
    }),

    addCart: builder.mutation({
      query: (data) => ({
        url: `/cart`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["cart"],
    }),

    updateCart: builder.mutation({
      query: ({ uid, id, ...data }) => ({
        url: `cart/${id}`,
        method: "PUT",
        body: { uid, id, ...data },
      }),
      invalidatesTags: ["cart"],
    }),
    deleteCart: builder.mutation({
      query: ({ uid, id }) => ({
        url: `user/${uid}/cart/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["cart"],
    }),

    deleteProduct: builder.mutation({
      query: (id) => ({
        url: `products/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["product"],
    }),

    getAllProducts: builder.query<product[], void>({
      query: () => `products`,
      providesTags: ["product"],
    }),
    getAddress: builder.query({
      query: (uid) => `user/${uid}/address/`,
      providesTags: ["address"],
    }),
    addAddress: builder.mutation({
      query: (data) => ({
        url: `address`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["address"],
    }),
    deleteAddress: builder.mutation({
      query: (id) => ({
        url: `address/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["address"],
    }),
    updateAddress: builder.mutation({
      query: (data) => ({
        url: `address/${data.id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["address"],
    }),
    UpdateProducts: builder.mutation({
      query: (data) => ({
        url: `products/${data.id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["product"],
    }),
  }),
});

export const {
  useGetProductsQuery,
  useGetCategoriesQuery,
  useGetFeaturedProductsQuery,
  useGetSingleProductQuery,
  useGetCommentsOfProductQuery,
  useAddUserMutation,
  useAddCartMutation,
  useGetCartItemsQuery,
  useUpdateCartMutation,
  useDeleteCartMutation,
  useDeleteProductMutation,
  useGetAllProductsQuery,
  useGetAddressQuery,
  useAddAddressMutation,
  useDeleteAddressMutation,
  useUpdateAddressMutation,
  useUpdateProductsMutation,
} = Api;
