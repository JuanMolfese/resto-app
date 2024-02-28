import Link from "next/link";
import { fetchProductsSucursal } from "../../utils/actions/products/page";
import CardProduct from "../../../components/Product/card";
import { fetchRubros } from "../../utils/actions/rubros/fetchs";
import fetchSubrubros from "../../utils/actions/subrubros/fetchs";

export default async function Products() {
  
  const products = await fetchProductsSucursal(1);
  const rubros = await fetchRubros();
  const subrubros = await fetchSubrubros();


  return (
    <section className="flex flex-col justify-center ">
      <div className="text-center my-2 text-xl">
        <h2>Listado de productos</h2>
      </div>
      <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
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
      
      <div className="flex flex-row justify-center flex-wrap">
        {products?.map((product) => (
          
          <div
            key={product.id}
          >
            <CardProduct product={product} rubros={rubros} subrubros={subrubros}/>  
          </div>
        ))}
      </div>
      
    </section>
  );
}
