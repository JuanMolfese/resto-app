import { useGetProductsQuery } from "@/redux/services/productsApi";
import CardProduct from "./cardProduct";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Spinner from "../../spinner";
import io, { Socket } from 'socket.io-client';

export default function ListadoProductos() {
  const { data, error, isLoading, refetch } = useGetProductsQuery();
  const params = useSearchParams();
  const [socket, setSocket] = useState<Socket | null>(null);

  const filteredProducts = data?.filter(product => {
    
    const query = params.get('query');
    return !query || product.subrubro_nombre.toLowerCase().includes(query.toLowerCase());
  });

  useEffect(() => {
    // Crear la conexión socket.io
    const socket = io('http://localhost:3000');
    setSocket(socket);

    // Definir el evento onproduct_updated para actualizar los datos cuando el servidor envíe una notificación
    socket.on('product_updated', (message) => {
      if (message.type === 'PRODUCT_UPDATED') {
        refetch(); // Refetch los datos cuando ocurra un cambio en los productos
      }
    });

    // Limpiar la conexión socket.io cuando el componente se desmonte
    return () => {
      socket.disconnect();
    };
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
