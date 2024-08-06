import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { Subrubro } from '../../../app/utils/models/types/subrubro'

export const subrubrosApi = createApi({
  reducerPath: 'subrubrosApi',
  baseQuery: fetchBaseQuery({ 
    baseUrl: '/api/' 
  }),
  endpoints: (builder) => ({
    getSububros: builder.query({
      query: () => 'subrubros',
    }),
    getSububrosById: builder.query({
      query: (id) => `subrubros/${id}`,
    }),
    deleteSubrubro: builder.mutation({
      query: (id) => `subrubros/${id}`,
    }),
  }),
})

export const { useGetSububrosQuery, useGetSububrosByIdQuery, useDeleteSubrubroMutation } = subrubrosApi