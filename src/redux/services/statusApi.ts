import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { Estado_pedido } from '../../../app/utils/models/types/estado_pedido'

export const statusApi = createApi({
  reducerPath: 'statusApi',
  baseQuery: fetchBaseQuery({ 
    baseUrl: '/api/' 
  }),
  endpoints: (builder) => ({
    getStatus: builder.query<Estado_pedido[], void>({
      query: () => 'status',
    })
  }),
})

export const { useGetStatusQuery } = statusApi