import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { Sucursal } from '../../app/utils/models/types/sucursal'

export const sucursalApi = createApi({
  reducerPath: 'sucursalApi',
  baseQuery: fetchBaseQuery({ 
    baseUrl: '/api/' 
  }),
  endpoints: (builder) => ({
    getSucursal: builder.query({
      query: (id) => `sucursal/${id}`
    }),
    updateSucursal: builder.mutation({
      query: ({ status, id }) => ({
        url: `sucursal/${id}`,
        method: 'PUT',
        body: status,
      })
    }),
  }),
})

export const { useGetSucursalQuery, useUpdateSucursalMutation } = sucursalApi