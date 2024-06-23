import { configureStore } from '@reduxjs/toolkit'
import cartReducer from './features/cartSlice'
import productsListReducer from './features/productSlice'
import { productApi } from './services/productsApi'
import { rubrosApi } from './services/rubrosApi'
import { subrubrosApi } from './services/subrubrosApi'
import { orderApi } from './services/ordersApi'

export const makeStore = () => {
  return configureStore({
    reducer: {
      // Add reducers here
      cart: cartReducer,
      productsList: productsListReducer,
      [productApi.reducerPath]: productApi.reducer,
      [rubrosApi.reducerPath]: rubrosApi.reducer,
      [subrubrosApi.reducerPath]: subrubrosApi.reducer,
      [orderApi.reducerPath]: orderApi.reducer
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(productApi.middleware, rubrosApi.middleware, subrubrosApi.middleware, orderApi.middleware),
  })
}

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']