import {
    createApi,
    fetchBaseQuery
} from '@reduxjs/toolkit/query/react'
import {
    category,
    Comment,
    product,
    // cart
} from '../../types'
export const Api:any = createApi({
    reducerPath: 'Api',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3000/' }),
    tagTypes: ['cart','product'],
    endpoints: (builder) => ({
        getCategories: builder.query<category[], void>({
            query: () => `categories`,
        }),

        getFeaturedProducts: builder.query<product[], void>({
            query: () => `featuredProducts`,

        }),

        getSingleProduct: builder.query({
            query: (id) => `products/${id}`,

        }),

        getCommentsOfProduct: builder.query<Comment[], string | number | undefined>({
            query: (id) => `products/${id}/comments/`,
        }),

        getCartItems: builder.query<any,any>({
            query: (uid) => `user/${uid}/cart/`,
            providesTags: ['cart']
        }),

        addUser: builder.mutation({
            query: (data) => ({
                url: `user`,
                method: 'POST',
                body: data
            }),
        }),

        addCart:builder.mutation({
            query: (data) => ({
                url: `/cart`,
                method: 'POST',
                body: data,
        }),
        invalidatesTags: ['cart']

        }),


        updateCart: builder.mutation({
            query: ({ uid, id, ...data }) =>
             ({
                url: `cart/${id}`,
                method: 'PUT',
                body: {uid,id,...data}
            }),
            invalidatesTags: ['cart']

        }),
        deleteCart: builder.mutation({
            query: ({ uid, id }) => ({
                url: `user/${uid}/cart/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['cart']
        }),

        deleteProduct: builder.mutation({
            query: (id) => ({
                url: `products/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['product']
        }),

        getAllProducts : builder.query<product[], void>({
            query: () => `products`,
            providesTags: ['product']
        }),
        getAddress: builder.query({
            query: (uid) => `user/${uid}/address/`,
        }),


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
    useDeleteCartMutation,
    useDeleteProductMutation,
    useGetAllProductsQuery,
    useGetAddressQuery,

    // useAddCommentsMutation
} = Api;