import { configureStore } from '@reduxjs/toolkit'
import cartReducer from './features/cartSlice'
import productsListReducer from './features/productSlice'
import { productApi } from './services/productsApi'
import { rubrosApi } from './services/rubrosApi'

export const makeStore = () => {
  return configureStore({
    reducer: {
      // Add reducers here
      cart: cartReducer,
      productsList: productsListReducer,
      [productApi.reducerPath]: productApi.reducer,
      [rubrosApi.reducerPath]: rubrosApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(productApi.middleware, rubrosApi.middleware),
  })
}

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']