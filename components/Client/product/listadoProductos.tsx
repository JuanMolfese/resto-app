import { useGetProductsQuery } from "@/redux/services/productsApi";
import CardProduct from "./cardProduct";
import { useEffect, useState } from "react";

export default function ListadoProductos() {

  const { data, error, isLoading, refetch } = useGetProductsQuery();
  const [refreshInterval, setRefreshInterval] = useState(5000); // Intervalo de actualización en milisegundos (1 minuto)

  // Hook para manejar la actualización periódica
  useEffect(() => {
    const intervalId = setInterval(() => {
      // Llamar a refetch para actualizar los datos
      refetch();
    }, refreshInterval);

    // Limpiar el intervalo cuando el componente se desmonte
    return () => clearInterval(intervalId);
  }, [refreshInterval, refetch]);

  if (isLoading) { 
    return (
      <div className="flex justify-center items-center h-screen">
        <svg className="animate-spin h-5 w-5 mr-3 ..." viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C6.477 0 0 6.477 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
      </div>
    )
  }
  if (error) { return <div>Error</div> }

  return (
    <ul className="flex flex-wrap py-2 gap-1">
      {data?.map(product => (
        <CardProduct product={product} key={product.id} />
        ))}
    </ul>
  )
}