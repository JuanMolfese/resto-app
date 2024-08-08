"use client"
import Link from "next/link";
import CardProduct from "../../../components/Product/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { useGetProductsQuery } from "@/redux/services/productsApi";
import { useGetRubrosQuery } from "@/redux/services/rubrosApi";
import { useGetSubrubrosQuery } from "@/redux/services/subrubrosApi";
import { useEffect, useState } from "react";
import { ProductoDetail } from "../../utils/models/types/producto";
import Spinner from "../../../components/spinner";

export default function Products({
  searchParams,
}: {
  searchParams?: {
    ms?: string;
    page?: string;
  };
}) {

  const query = searchParams?.ms || false;
  const {data: products, error: errorProducts, isLoading: loadingProducts, refetch} = useGetProductsQuery();
  const {data: rubros, error: errorRubros, isLoading: loadingRubros} = useGetRubrosQuery();
  const {data: subrubros, error: errorSubrubros, isLoading: loadingSubrubros} = useGetSubrubrosQuery();
  const [productsFiltered, setProductsFiltered] = useState<ProductoDetail[] | undefined>(undefined);

useEffect(() => {
  if (query) {
    setProductsFiltered(products?.filter((product: any) => product.stock === 0));
  } else {
    setProductsFiltered(products);
  }
}, [query, products]);

if (loadingProducts || loadingRubros || loadingSubrubros) return <Spinner />;

  return (
    <ScrollArea>
    {/*   <div className="text-center my-2 text-xl">
        <h2>Listado de productos</h2>
      </div> */}
      <div className="flex items-center justify-between gap-2">
        <div className="flex justify-between w-full p-4">
          
          <div>  
            { !query ?
            <Link href={`/dashboard/products?ms=true`}>
              <Badge variant={"destructive"}>
                Sin stock
              </Badge>
            </Link>
            :
            <Link href={`/dashboard/products`}>
              <Badge variant={"outline"}>
                Ver todos
              </Badge>
            </Link>
          }
          </div>
          {/* <SearchProducts placeholder="Buscar productos..." /> */}
          <Link href="/dashboard/products/create">
            <span className="flex items-center justify-center px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded-md shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6 mr-2"
                >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 4.5v15m7.5-7.5h-15"
                  />
              </svg>
              Crear producto
            </span>
          </Link>
          
        </div>
      </div>
      
      <div className="flex flex-row flex-wrap">
        {productsFiltered?.map((product) => (
          
          <div
            key={product.id}
          >
            <CardProduct product={product} rubros={rubros} subrubros={subrubros}/>  
          </div>
        ))}
      </div>

  
    </ScrollArea>
  );
}
