"use client"

import { useGetProductsQuery } from "@/redux/services/productsApi";

export default function ProductListRedux() {

  const { data, error, isLoading } = useGetProductsQuery();
  
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error</div>;

  return (
    <>
      {
        data?.data.map((product) => (
          <div key={product.id}>
            <p>{product.nombre}</p>
          </div>
        ))
      }
    </>
  )
  
  
}