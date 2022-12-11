import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'


export const Api = createApi({
    reducerPath: 'categoryApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3000/' }),
    endpoints: (builder) => ({
        getCategories: builder.query({
            query: () => `categories`,
        }),
        getFeaturedProducts: builder.query({
            query: () => `featuredProducts`,
        }),
        getSingleProduct:builder.query({
            query: (id) => `products/${id}`,
        })
    }),
})



export const {useGetCategoriesQuery, useGetFeaturedProductsQuery, useGetSingleProductQuery }  = Api;