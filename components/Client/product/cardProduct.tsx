"use client"

import Image from "next/image";
import { ProductoDetail } from "../../../app/utils/models/types/producto";
import styles from "./cardProduct.module.css";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { addToCart } from "@/redux/features/cartSlice";
import { MinusIcon, PlusIcon } from "@radix-ui/react-icons";
import { myToastError } from "../../myToast";


export default function CardProduct({ product }: { product: ProductoDetail }) {
  const dispatch = useAppDispatch();
  const carrito = useAppSelector(state => state.cart);

  const numbers = [0,1,2,3,4,5,6,7,8,9];

  const addProd = () => {
    const input = document.getElementById(`i${product.id}`) as HTMLInputElement;
    if (input) {
      input.value = (parseInt(input.value) + 1).toString();
    }
    const productInCart = carrito.items.find(item => item.id === product.id);
    if (productInCart && (parseInt(input.value) + productInCart.cantidad > product.stock)) {
      myToastError(`Stock insuficiente. Solo nos quedan ${productInCart.stock}`);
      input.value = (parseInt(input.value) - 1).toString();
      return
    }
    if (parseInt(input.value) > product.stock) {
      myToastError(`Stock insuficiente. Solo nos quedan ${product.stock}`);
      input.value = (parseInt(input.value) - 1).toString();
      return;
    }
    
  }

  const removeProd = () => {
    const input = document.getElementById(`i${product.id}`) as HTMLInputElement;
    if (input && parseInt(input.value) > 0){
      input.value = (parseInt(input.value) - 1).toString();
    }
  }

  const checkVal = () => {
    const input = document.getElementById(`i${product.id}`) as HTMLInputElement;
    if (input && !numbers.includes(parseInt(input.value[input.value.length - 1]))){
      input.value = input.value.slice(0, input.value.length - 1);
    }
  }

  const addCart = () => {
    const input = document.getElementById(`i${product.id}`) as HTMLInputElement;
    const cant = parseInt(input.value);
    const prodCart = {...product, cantidad: cant}
    if (parseInt(input.value) > product.stock) {
      myToastError(`Stock insuficiente. Solo nos quedan ${product.stock}`);
      input.value = "0";
      return;
    }
    if (input && cant > 0){
      dispatch(addToCart({prodCart}));
      input.value = "0";
    }
  }

  return (
    <li key={product.id} className="shadow-lg flex flex-col items-center w-full mx-4 md:w-1/2 lg:w-1/3 xl:w-1/4 p-2 min-w-[280px] min-h-[80px]">
      <div className="w-full h-44 m-auto flex flex-row items-center">
        <Image 
          src={product.image ? product.image : "/no-image.png"}
          alt={product.nombre}
          width={90}
          height={90}
          className="w-2/5 h-auto ml-2 rounded-md object-contain"
        />
        
        <div className="mx-2 w-3/5 h-4/5">
          <div className="flex flex-col ml-3">
            <span className="text-xs">{product.subrubro_nombre}</span>
            <h2 className="text-md font-bold text-slate-900 line-clamp-1">
              {product.nombre}
            </h2>
          </div>
          {product.stock > 0 ? 
          <>
            <p className="text-slate-700 ml-3">{(product.precio).toLocaleString('es-ar', {style: 'currency', currency: 'ARS', minimumFractionDigits: 2})}</p>
            
            <div className="flex columns-1 md:columns-3 lg:columns-5 my-1">
              
              <div className="mt-2 flex w-full justify-around items-center px-2">                     
                <button className="p-2 rounded-full bg-green-600 text-white cursor-pointer hover:bg-green-400 hover:font-bold" onClick={removeProd}>
                  <MinusIcon className="white"/>
                </button>
                <input id={`i${product.id}`} type="number" className={`grow w-10 h-8 text-center text-lg rounded`} defaultValue={0} min={0} max={999} onChange={checkVal} readOnly/>                            
                <button className="p-2 rounded-full bg-green-600 text-white cursor-pointer hover:bg-green-400 hover:font-bold" onClick={addProd}>
                  <PlusIcon className="white"/>
                </button>
              </div>
            </div>
            <div className="w-full mt-2 flex justify-center">
              <button className="w-36 h-8 bg-slate-800 flex justify-center text-white rounded-md p-1 hover:bg-slate-900" onClick={addCart}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.0} stroke="white" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
                </svg>
                <span className="ml-1">Agregar</span>
              </button>
            </div>
          </>
          : <p className="text-base text-red-600 ml-4 mt-4">Agotado</p>}
        </div>
      </div>
    </li>
  )
}