import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { Estado_pedido } from '../../../app/utils/models/types/estado_pedido'

export const statusApi = createApi({
  reducerPath: 'statusApi',
  baseQuery: fetchBaseQuery({ 
    baseUrl: '/api/' 
  }),
  endpoints: (builder) => ({
    getStatus: builder.query({
      query: () => 'status',
    }),
    deleteStatus: builder.mutation({
      query: (id) => ({
        url: `status/${id}`,
        method: 'DELETE',
      }),
    }),
  }),
})

export const { useGetStatusQuery, useDeleteStatusMutation } = statusApi