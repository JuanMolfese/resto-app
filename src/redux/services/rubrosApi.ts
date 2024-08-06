import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { Rubro } from '../../../app/utils/models/types/rubro'

export const rubrosApi = createApi({
  reducerPath: 'rubrosApi',
  baseQuery: fetchBaseQuery({ 
    baseUrl: '/api/' 
  }),
  endpoints: (builder) => ({
    getRubros: builder.query({
      query: () => 'rubros',
    }),
  }),
})

export const { useGetRubrosQuery } = rubrosApi