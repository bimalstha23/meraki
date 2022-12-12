import {
    createApi,
    fetchBaseQuery
} from '@reduxjs/toolkit/query/react'
import {
    category,
    Comment,
    product,
    cart
} from '../../types'
export const Api = createApi({
    reducerPath: 'Api',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3000/' }),
    tagTypes: ['API'],
    endpoints: (builder) => ({
        getCategories: builder.query<category[], void>({
            query: () => `categories`,
            providesTags: ['API']
        }),


        getFeaturedProducts: builder.query<product[], void>({
            query: () => `featuredProducts`,
            providesTags: ['API']

        }),

        getSingleProduct: builder.query<product, string | number | undefined>({
            query: (id) => `products/${id}`,
            providesTags: ['API']

        }),

        getCommentsOfProduct: builder.query<Comment[], string | number | undefined>({
            query: (id) => `products/${id}/comments/`,
            providesTags: ['API']

        }),

        getCartItems: builder.query({
            query: (uid) => `user/${uid}/cart/`,
            providesTags: ['API']
        }),

        addUser: builder.mutation<void, cart>({
            query: (data) => ({
                url: `user`,
                method: 'POST',
                body: data
            }),
            invalidatesTags: ['API']
        }),

        addCart: builder.mutation({
            query: ({ uid, ...data }) => ({
                url: `user/${uid}/cart/`,
                method: 'POST',
                body: data
            }),
            invalidatesTags: ['API']
        }),

        updateCart: builder.mutation({
            query: ({ uid, id, ...data }) => ({
                url: `user/${uid}/cart/${id}`,
                method: 'PUT',
                body: data
            }),
            invalidatesTags: ['API']

        }),
        deleteCart: builder.mutation({
            query: ({ uid, id }) => ({
                url: `user/${uid}/cart/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['API']
        })
    })
})


export const {
    useGetCategoriesQuery,
    useGetFeaturedProductsQuery,
    useGetSingleProductQuery,
    useGetCommentsOfProductQuery,
    useAddUserMutation,
    useAddCartMutation,
    useGetCartItemsQuery,
    useUpdateCartMutation,
    useDeleteCartMutation
} = Api;