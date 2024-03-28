import Link from "next/link";
import { fetchProductsOutofStock, fetchProductsSucursal } from "../../utils/actions/products/fetchs";
import CardProduct from "../../../components/Product/card";
import { fetchRubros } from "../../utils/actions/rubros/fetchs";
import fetchSubrubros from "../../utils/actions/subrubros/fetchs";
import { redirect } from "next/navigation";


export default async function Products({
  searchParams,
}: {
  searchParams?: {
    ms?: string;
    page?: string;
  };
}) {

  const query = searchParams?.ms || false;
  const products = query ? await fetchProductsOutofStock(1) : await fetchProductsSucursal(1);
  const rubros = await fetchRubros();
  const subrubros = await fetchSubrubros();


  return (
    <>
    {/*   <div className="text-center my-2 text-xl">
        <h2>Listado de productos</h2>
      </div> */}
      <div className="flex items-center justify-between gap-2">
        <div className="flex justify-between w-full p-4">
          
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
          <div>
            
            <Link href="/dashboard/products" className="bg-gray-200 rounded">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
      
      <div className="flex flex-row justify-center flex-wrap">
        {products?.map((product) => (
          
          <div
            key={product.id}
          >
            <CardProduct product={product} rubros={rubros} subrubros={subrubros}/>  
          </div>
        ))}
      </div>
      
    </>
  );
}
