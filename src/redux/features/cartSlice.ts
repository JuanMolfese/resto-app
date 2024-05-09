import {createSlice} from '@reduxjs/toolkit'
import { ProductCart } from '../../../app/utils/models/types/producto';


interface State {
  items: ProductCart[];
  total: number;
}

const initialState: State = {
  items: [],
  total: 0
}

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
    
      const { prodCart } = action.payload;
      // Verificar si el producto ya está en el carrito
      const index = state.items.findIndex(item => item.id === prodCart.id);
      if (index !== -1) {
        state.items[index].cantidad = Number(state.items[index].cantidad) + parseInt(prodCart.cantidad, 10);
      } else {
        state.items = [...state.items, prodCart]; // Crear una nueva matriz con el producto añadido
      }
      state.total += prodCart.precio * prodCart.cantidad;
    },
    removeFromCart: (state, action) => {
      const index = state.items.findIndex(item => item.id === action.payload.id)
      state.items.splice(index, 1)
      state.total -= action.payload.precio * action.payload.cantidad
    },
    clearCart: state => {
      state.items = []
      state.total = 0
    }
  }
})

export const {addToCart, removeFromCart, clearCart} = cartSlice.actions
export default cartSlice.reducer