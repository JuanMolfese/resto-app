import { useGetProductsQuery } from "@/redux/services/productsApi";
import CardProduct from "./cardProduct";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Spinner from "../../spinner";
import io from "socket.io-client";

const socket = io('http://localhost:3000');

export default function ListadoProductos() {
  const { data, error, isLoading, refetch } = useGetProductsQuery();
  const params = useSearchParams();

  const filteredProducts = data?.filter(product => {
    
    const query = params.get('query');
    return !query || product.subrubro_nombre.toLowerCase().includes(query.toLowerCase());
  });

  useEffect(() => {
    socket.on('updateProduct', (data) => {
        //console.log("Recieved from SERVER ::", data)
        refetch();
        // Execute any command
    })
  }, [refetch]);

  if (isLoading) { 
    return (
      <Spinner />
    )
  }
  if (error) { return <div>Error</div> }

  return (
    <>
      <ul className="flex flex-wrap py-2 gap-1">
        {filteredProducts?.map(product => (
          <CardProduct product={product} key={product.id} />
        ))}
      </ul>
    </>
  )
}
