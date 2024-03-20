"use client"
import Link from "next/link";
import { ProductoDetail } from "../../../app/utils/models/types/producto";
import Image from "next/image";
import Search from "./search";
import CardProduct from "./cardProduct";
import { useState } from "react";

interface ProductInCart extends ProductoDetail {
  cantidad: number;
}

export default function ListProducts({ products }: { products?: any[] }) {

  const [cart, setCart] = useState<ProductInCart[]>([]);
  const [cartEncoded, setCartEncoded] = useState('');

  const agregarProducto = (producto: ProductInCart, cant: number) => {
    const index = cart.findIndex(p => p.id === producto.id);
    if (index === -1) {
      setCart([...cart, {...producto, cantidad: cant}]);
    } else {
      const newCart = cart.map(p => {
        if (p.id === producto.id) {
          return {...p, cantidad: Number(p.cantidad) + Number(cant)};
        }
        return p;
      });
      setCart(newCart);
    }
  }

  const viewCart = () => {
    if (cart.length > 0) {
      document.getElementById('listProd')?.classList.toggle('hidden');
      document.getElementById('cartProd')?.classList.toggle('hidden');
    } else {
      alert('No hay productos en el carrito');
    }
  }

  return (
    <>
      
      <nav className="flex gap-1 items-center bg-color-nav justify-around sticky top-0">
        <Link href={'/'} className="drop-shadow-md hover:drop-shadow-xl">
          <Image src="/balcon-icon.png" alt="logo" width={80} height={80} className="cursor-pointer"/>
        </Link>
        <Search placeholder="Buscar productos" />
        <div className="flex row-reverse cursor-pointer p-2 rounded-full hover:bg-green-400" onClick={() => viewCart()}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
          </svg>
          
          <span className="ml-1" >{cart.length}</span>
          
        </div>

      </nav>
      <main id="listProd" className="">
        <ul className="flex flex-wrap py-2 justify-center gap-1">
          {products?.map(product => (
            <CardProduct product={product} key={product.id} agregar={agregarProducto} />
            
            ))}
        </ul>
      </main>
      
      <div id="cartProd" className="hidden container p-4">
        <h1 className="text-center text-xl font-bold mb-2">Carrito de compras</h1>
        <table className="w-full divide-y divide-gray-200">
          <thead>
           {/*  <tr>
              <th>Producto</th>
              <th>Precio</th>
              <th>Descripción</th>
              <th>Cantidad</th>
            </tr> */}
          </thead>
          <tbody className="bg-white-200 divide-y divide-gray-200">
            {cart.map(product => (
              <tr key={product.id} className="text-center mt-2">
                <td className="px-4 py-2 whitespace-nowrap">{product.nombre}</td>
                <td className="px-4 py-2 whitespace-nowrap">{product.cantidad}</td>
                <td className="px-4 py-2 whitespace-nowrap">{(product.precio).toLocaleString('es-ar', {style: 'currency', currency: 'ARS', minimumFractionDigits: 2})}</td>
                <td className="px-4 py-2 whitespace-nowrap flex justify-center items-center py-1">
                  <button className="bg-red-500 text-white rounded-full p-1 hover:bg-red-600" onClick={() => {
                    const newCart = cart.filter(p => p.id !== product.id);
                    setCart(newCart);
                    if (newCart.length === 0) {
                      viewCart();
                    }
                  }}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                      <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                    </svg>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <button className="mt-8 mx-auto py-2 px-4 text-white border rounded-full bg-blue-400 hover:bg-blue-500 flex justify-center" onClick={() => viewCart()}>
          Seguir comprando
        </button>
      </div>
    </>
  );
}