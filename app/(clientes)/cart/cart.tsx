import { ProductoDetail } from "../../utils/models/types/producto";

interface ProductInCart extends ProductoDetail {
  cantidad: number;
}

const cart: ProductInCart[] = [];

const getProductInCart = (producto: ProductInCart) => {
  const index = cart.findIndex(p => p.id === producto.id);
  return cart[index];
}

const addProductInCart = (producto: ProductInCart, cant: number) => {
  const index = cart.findIndex(p => p.id === producto.id);
  if (index === -1) {
    cart.push({...producto, cantidad: cant});
  } else {
    cart[index].cantidad += cant;
  }
}

const removeProductInCart = (producto: ProductInCart) => {
  const index = cart.findIndex(p => p.id === producto.id);
  cart.splice(index, 1);
}

const getCart = () => {
  return cart;
}

const clearCart = () => {
  cart.splice(0, cart.length);
}

export {
  getProductInCart,
  addProductInCart,
  removeProductInCart,
  getCart,
  clearCart
}
