import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { Subrubro } from '../../../app/utils/models/types/subrubro'

export const subrubrosApi = createApi({
  reducerPath: 'subrubrosApi',
  baseQuery: fetchBaseQuery({ 
    baseUrl: '/api/' 
  }),
  endpoints: (builder) => ({
    getSubrubros: builder.query<Subrubro[], void>({
      query: () => 'subrubros',
    }),
    createSubrubro: builder.mutation({
      query: (subrubro) => ({
        url: `subrubros`,
        method: 'POST',
        body: subrubro,
      }),
    }),
    getSubrubrosById: builder.query<Subrubro, string>({
      query: (id) => `subrubros/${id}`,
    }),
    updateSubrubro: builder.mutation({
      query: ({id, nombre, rubro_id}) => ({
        url: `subrubros/${id}`,
        method: 'PUT',
        body: {nombre, rubro_id},
      }),
    }),
    deleteSubrubro: builder.mutation<void, number>({
      query: (id) => ({
        url: `subrubros/${id}`,
        method: 'DELETE',
      }),
    })
    
    
  }),
})

export const { useGetSubrubrosQuery, useGetSubrubrosByIdQuery, useUpdateSubrubroMutation, useDeleteSubrubroMutation, useCreateSubrubroMutation } = subrubrosApi