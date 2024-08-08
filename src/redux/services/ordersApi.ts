import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { Pedido } from '../../app/utils/models/types/pedido'

export const orderApi = createApi({
  reducerPath: 'orderApi',
  baseQuery: fetchBaseQuery({ 
    baseUrl: '/api/' 
  }),
  endpoints: (builder) => ({
    getPedidos: builder.query<Pedido[], void>({
      query: () => 'pedidos',
    }),
    updatePedido: builder.mutation({
      query: ({ value, order }) => ({
        url: `pedidos/${order}`,
        method: 'PUT',
        body: value,
      })
    }),
    getDetailPedido: builder.query({
      query: (id) => `pedidos/${id}`,
    })
  }),
})

export const { useGetPedidosQuery, useUpdatePedidoMutation, useGetDetailPedidoQuery } = orderApi