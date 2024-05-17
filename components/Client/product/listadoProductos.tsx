import { useGetProductsQuery } from "@/redux/services/productsApi";
import CardProduct from "./cardProduct";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Spinner from "../../spinner";

export default function ListadoProductos() {

  const { data, error, isLoading, refetch } = useGetProductsQuery();
  const [refreshInterval, setRefreshInterval] = useState(5000); // Intervalo de actualización en milisegundos (1 minuto)
  const params = useSearchParams();

  const filteredProducts = data?.filter(product => {
    const query = params.get('query');
    return !query || product.rubro_nombre.toLowerCase().includes(query.toLowerCase());
  });

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