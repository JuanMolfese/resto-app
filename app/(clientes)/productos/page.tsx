import { Metadata } from "next";
import { fetchProductsSucursal } from "../../utils/actions/products/fetchs";
import Link from "next/link";
import Image from "next/image";
import Search from "../../../components/Client/product/search";

export const metadata: Metadata = {
  title: 'Productos',
};
 

export default async function ProductsSale({
  searchParams
}: {
  searchParams?: { 
    query?: string;
  }
}) {

  const products = await fetchProductsSucursal(1);


  return (
    <>
      <nav className="flex gap-1 items-center bg-color-nav justify-around">
        <Link href={'/'} className="drop-shadow-md hover:drop-shadow-xl">
          <Image src="/balcon-icon.png" alt="logo" width={80} height={80} className="cursor-pointer"/>
        </Link>
        <Search placeholder="Buscar productos" />
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
        </svg>

      </nav>
      <main>
        <ul className="flex p-10">
          {products?.map(product => (
            <li key={product.id} className="shadow-md w-1/2 flex flex-col items-center">
              <div className="">
                <Image src='/dona.jpg' alt={product.nombre} width={150} height={150} className=""/>
              </div>
              <h2 className="text-md">{product.nombre}</h2>
              <p>{product.descripcion}</p>
              <p>{(product.precio).toLocaleString('es-ar', {style: 'currency', currency: 'ARS', minimumFractionDigits: 2})}</p>

            </li>
          ))}
        </ul>

      </main>
    </>
  )
}