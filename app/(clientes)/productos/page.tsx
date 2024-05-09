import { Metadata } from "next";
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

 
  return (
    <>
      <ListProducts />
    </>
  )
}