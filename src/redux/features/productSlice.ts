import {createSlice} from '@reduxjs/toolkit'
import { ProductoDetail } from '../../../app/utils/models/types/producto';


interface State {
  items: ProductoDetail[];
}

const initialState: State = {
  items: [],
}

export const cartSlice = createSlice({
  name: "productSlice",
  initialState,
  reducers: {
    addToListProducts: (state, action) => {
      const { prod } = action.payload;
      state.items = [...state.items, prod ]; // Crear una nueva matriz con el producto añadido
    },
    clearListProducts: state => {
      state.items = []
    }
  }
})

export const {addToListProducts, clearListProducts} = cartSlice.actions
export default cartSlice.reducer