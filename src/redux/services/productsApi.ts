import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { Producto, ProductoDetail } from '../../../app/utils/models/types/producto'

export const productApi = createApi({
  reducerPath: 'productApi',
  baseQuery: fetchBaseQuery({ 
    baseUrl: '/api/' 
  }),
  endpoints: (builder) => ({
    getProducts: builder.query<ProductoDetail[], void>({
      query: () => 'products',
    }),
    getProductById: builder.query({
      query: (id) => `products/${id}`,
    }),
    addProduct: builder.mutation({
      query: (newProduct) => ({
        url: 'products',
        method: 'POST',
        body: newProduct,
      }),
    }),
    updateProduct: builder.mutation({
      query: ({ id, ...update }) => ({
        url: `products/${id}`,
        method: 'PUT',
        body: update,
      }),
    }),
    removeProduct: builder.mutation({
      query: (id) => ({
        url: `products/${id}`,
        method: 'DELETE',
      }),
    }),
  }),
})

export const { useGetProductsQuery, useGetProductByIdQuery, useAddProductMutation, useUpdateProductMutation, useRemoveProductMutation } = productApi