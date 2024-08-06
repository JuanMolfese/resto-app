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
  }),
})

export const { useGetSububrosQuery } = subrubrosApi