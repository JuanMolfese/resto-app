"use client"
import Link from "next/link";
import { ProductoDetail } from "../../../app/utils/models/types/producto";
import Image from "next/image";
import Search from "./search";
import CardProduct from "./cardProduct";
import { useState } from "react";

export default function ListProducts({ products }: { products?: any[] }) {

  const [cart, setCart] = useState<ProductoDetail[]>([]);

  const agregarProducto = (producto: ProductoDetail) => {
    setCart([...cart, producto]);
  }

  return (
    <>
      <nav className="flex gap-1 items-center bg-color-nav justify-around sticky top-0">
        <Link href={'/'} className="drop-shadow-md hover:drop-shadow-xl">
          <Image src="/balcon-icon.png" alt="logo" width={80} height={80} className="cursor-pointer"/>
        </Link>
        <Search placeholder="Buscar productos" />
        <div className="flex row-reverse">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
          </svg>
          <span className="ml-1">{cart.length}</span>
        </div>

      </nav>
      <main className="">
        <ul className="flex flex-wrap py-2 justify-center gap-1">
          {products?.map(product => (
            <CardProduct product={product} key={product.id} agregar={agregarProducto} />
          
          ))}
        </ul>

      </main>

    </>
  );
}