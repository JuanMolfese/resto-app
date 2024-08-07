import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { Sucursal } from '../../../app/utils/models/types/sucursal'

export const usersApi = createApi({
  reducerPath: 'usersApi',
  baseQuery: fetchBaseQuery({ 
    baseUrl: '/api/' 
  }),
  endpoints: (builder) => ({
    getUsers: builder.query({
      query: () => `usuario`
    }),
   getUserById: builder.query({
    query: (id) => `usuario/${id}`
   }),
   getUserByEmail: builder.query({
    query: (email) => `usuario/email/${email}`
   })
  }),
})

export const { useGetUsersQuery, useGetUserByIdQuery, useGetUserByEmailQuery } = usersApi