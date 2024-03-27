import { Metadata } from "next";
import { fetchProductsSucursal } from "../../utils/actions/products/fetchs";
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