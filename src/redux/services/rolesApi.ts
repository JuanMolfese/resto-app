import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { Rol } from '../../../app/utils/models/types/rol'

export const rolesApi = createApi({
  reducerPath: 'rolesApi',
  baseQuery: fetchBaseQuery({ 
    baseUrl: '/api/' 
  }),
  endpoints: (builder) => ({
    getRoles: builder.query<Rol[], void>({
      query: () => `roles`
    }),
  }),
})

export const { useGetRolesQuery } = rolesApi