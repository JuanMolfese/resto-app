import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { Sucursal } from '../../../app/utils/models/types/sucursal'
import { Usuario } from '../../../app/utils/models/types/usuario'

export const usersApi = createApi({
  reducerPath: 'usersApi',
  baseQuery: fetchBaseQuery({ 
    baseUrl: '/api/' 
  }),
  endpoints: (builder) => ({
    getUsers: builder.query<Usuario[], void>({
      query: () => `usuario`
    }),
   getUserById: builder.query<Usuario, void>({
    query: (id) => `usuario/${id}`
   }),
   getUserByEmail: builder.query({
    query: (email) => `usuario/email/${email}`
   })
  }),
})

export const { useGetUsersQuery, useGetUserByIdQuery, useGetUserByEmailQuery } = usersApi