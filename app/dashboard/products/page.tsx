import Link from "next/link";
import { fetchProducts } from "../../utils/actions/products/page";

export default async function Products() {
  const products = await fetchProducts();
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
      <div className="flex flex-row justify-center">
        {products?.map((product) => (
          <div
            key={product.id}
            className="flex flex-col items-center justify-center w-1/4 p-2 m-2 bg-white border-2 border-gray-300 rounded-lg shadow-lg"
          >
            <p className="">{product.nombre}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
