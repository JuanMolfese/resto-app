import { Metadata } from "next";
import { fetchProductsSucursal } from "../../utils/actions/products/fetchs";
import Link from "next/link";
import Image from "next/image";
import Search from "../../../components/Client/product/search";
import CardProduct from "../../../components/Client/product/cardProduct";
import { Producto } from "../../utils/models/types/producto";
import ListProducts from "../../../components/Client/product/list";

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
      <ListProducts products={products} />
    </>
  )
}