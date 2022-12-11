import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import {
    category,
    Comment,
    product,
    cart
} from '../../types'
export const Api = createApi({
    reducerPath: 'Api',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3000/' }),
    endpoints: (builder) => ({
        getCategories: builder.query<category[],void>({
            query: () => `categories`,
        }),
        getFeaturedProducts: builder.query<product[],void>({
            query: () => `featuredProducts`,
        }),
        getSingleProduct: builder.query<product, string| number | undefined>({
            query: (id) => `products/${id}`,
        }),
        getCommentsOfProduct: builder.query<Comment[],string| number |undefined>({
            query: (id) => `products/${id}/comments/`,
        }),

        addCart: builder.mutation({
            query: (data) => ({
                url: `cart`,
                method: 'POST',
                body: data
            })
        })
    }),
})



export const { useGetCategoriesQuery, useGetFeaturedProductsQuery, useGetSingleProductQuery, useGetCommentsOfProductQuery } = Api;