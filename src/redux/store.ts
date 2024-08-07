import { configureStore } from '@reduxjs/toolkit'
import cartReducer from './features/cartSlice'
import { productApi } from './services/productsApi'
import { rubrosApi } from './services/rubrosApi'
import { subrubrosApi } from './services/subrubrosApi'
import { orderApi } from './services/ordersApi'
import { statusApi } from './services/statusApi'
import { sucursalApi } from './services/sucursalApi'
import { usersApi } from './services/usersApi'
import { rolesApi } from './services/rolesApi'

export const makeStore = () => {
  return configureStore({
    reducer: {
      // Add reducers here
      cart: cartReducer,
      [productApi.reducerPath]: productApi.reducer,
      [rubrosApi.reducerPath]: rubrosApi.reducer,
      [subrubrosApi.reducerPath]: subrubrosApi.reducer,
      [orderApi.reducerPath]: orderApi.reducer,
      [statusApi.reducerPath]: statusApi.reducer,
      [sucursalApi.reducerPath]: sucursalApi.reducer,
      [usersApi.reducerPath]: usersApi.reducer,
      [rolesApi.reducerPath]: rolesApi.reducer
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(productApi.middleware, rubrosApi.middleware, subrubrosApi.middleware, orderApi.middleware, statusApi.middleware, sucursalApi.middleware, usersApi.middleware, rolesApi.middleware),


  })
}

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']