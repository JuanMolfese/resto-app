import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { Pedido } from '../../../app/utils/models/types/pedido'

export const orderApi = createApi({
  reducerPath: 'orderApi',
  baseQuery: fetchBaseQuery({ 
    baseUrl: '/api/' 
  }),
  endpoints: (builder) => ({
    getPedidos: builder.query<Pedido[], void>({
      query: () => 'pedidos',
    })
  }),
})

export const { useGetPedidosQuery } = orderApi