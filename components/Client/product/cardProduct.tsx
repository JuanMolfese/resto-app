"use client"

import Image from "next/image";
import { ProductoDetail } from "../../../app/utils/models/types/producto";
import styles from "./cardProduct.module.css";
import { useAppDispatch } from "@/redux/hooks";
import { addToCart } from "@/redux/features/cartSlice";

export default function CardProduct({ product }: { product: ProductoDetail }) {
  const dispatch = useAppDispatch();

  const numbers = [0,1,2,3,4,5,6,7,8,9];

  const addProd = () => {
    const input = document.getElementById(`i${product.id}`) as HTMLInputElement;
    if (input) {
      input.value = (parseInt(input.value) + 1).toString();
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
    if (input && cant > 0){
      dispatch(addToCart({prodCart}));
      input.value = "0";
    }
  }

  return (
    <li key={product.id} className="shadow-lg flex flex-row items-center w-80 h-44 m-auto">
      
      <Image 
        src={product.image}
        alt={product.nombre}
        width={90}
        height={90}
        className="w-2/5 h-auto ml-2 rounded-md object-contain"
      />
      
      <div className="mx-2 w-3/5 h-3/4">
        <h2 className="text-md font-bold ml-3 text-slate-900 line-clamp-1">{product.nombre}</h2>
        {/* <p className="text-xs">{product.descripcion}</p> */}
        {product.stock > 0 ? 
        <>
          <p className="text-slate-700 ml-3">{(product.precio).toLocaleString('es-ar', {style: 'currency', currency: 'ARS', minimumFractionDigits: 2})}</p>
          
          <div className="flex columns-1 md:columns-3 lg:columns-5 my-1">
            
            <div className="mt-2 flex w-full justify-around items-center">              
              <button className="mx-2 size-10" onClick={removeProd}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="green" viewBox="0 0 24 24" strokeWidth={1.0} stroke="white" className="w-10 h-10 hover:fill-green-700">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 12H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                </svg>
              </button>              
              <input id={`i${product.id}`} type="number" className={`w-10 h-8 text-center text-lg rounded ${styles.nospin}`} defaultValue={0} min={0} max={999} onChange={checkVal}/>                            
              <button className="mx-2" onClick={addProd}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="green" viewBox="0 0 24 24" strokeWidth={1.0} stroke="white" className="w-10 h-10 hover:fill-green-400">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                </svg>
              </button>
            </div>
          </div>
          <div className="w-full mt-3 flex justify-center">
            <button className="w-36 h-8 bg-slate-800 flex justify-center text-white rounded-md p-1 hover:bg-slate-900 " onClick={addCart}>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.0} stroke="white" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
              </svg>
              <span className="ml-1">Agregar</span>
            </button>
          </div>
        </>
        : <p className="text-xs text-red-400">Agotado</p>}
      </div>
    </li>
  )
}