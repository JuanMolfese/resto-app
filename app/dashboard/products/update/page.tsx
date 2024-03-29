import Link from "next/link";
import {fetchRubros} from "../../../utils/actions/rubros/fetchs";
import fetchSubrubros from "../../../utils/actions/subrubros/fetchs";

export default async function UpdateProduct() {
  
  const rubros = await fetchRubros();
  const subrubros = await fetchSubrubros();

  return (
    <form className="bg-gray-50 my-4 mx-2 rounded-md">
      <div className="flex justify-between items-center px-4 py-2 border-b border-gray-200 sm:px-6">
        <h2 className="text-lg leading-6 font-medium text-gray-900">
          Editar producto
        </h2>
      </div>
      <div className="rounded-md p-4 md:p-6">
        {/* Rubro */}
        <div className="mb-4">
          <label htmlFor="customer" className="mb-2 block text-sm font-medium">
            Elegir Nuevo Rubro
          </label>
          <div className="relative">
            <select
              id="customer"
              name="customerId"
              className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              defaultValue=""
              aria-describedby="customer-error"
            >
              <option value="" disabled>
                Seleccionar nuevo rubro
              </option>
              {rubros?.map((rubro) => (
                <option key={rubro.id} value={rubro.id} className="py-2">
                  {rubro.nombre}
                </option>
              ))}
            </select>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500"
            >
              <path
                fillRule="evenodd"
                d="M5.25 2.25a3 3 0 0 0-3 3v4.318a3 3 0 0 0 .879 2.121l9.58 9.581c.92.92 2.39 1.186 3.548.428a18.849 18.849 0 0 0 5.441-5.44c.758-1.16.492-2.629-.428-3.548l-9.58-9.581a3 3 0 0 0-2.122-.879H5.25ZM6.375 7.5a1.125 1.125 0 1 0 0-2.25 1.125 1.125 0 0 0 0 2.25Z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          {/*  <div id="customer-error" aria-live="polite" aria-atomic="true">
            {state.errors?.customerId &&
              state.errors.customerId.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div> */}
        </div>

        {/* Subrubro */}
        <div className="mb-4">
          <label htmlFor="customer" className="mb-2 block text-sm font-medium">
            Elegir nuevo subrubro
          </label>
          <div className="relative">
            <select
              id="customer"
              name="customerId"
              className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              defaultValue=""
              aria-describedby="customer-error"
            >
              <option value="" disabled>
                Seleccionar nuevo subrubro
              </option>
              {subrubros?.map((rubro) => (
                <option key={rubro.id} value={rubro.id} className="py-2">
                  {rubro.nombre}
                </option>
              ))}
            </select>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9.568 3H5.25A2.25 2.25 0 0 0 3 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 0 0 5.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 0 0 9.568 3Z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 6h.008v.008H6V6Z"
              />
            </svg>
          </div>
          {/*  <div id="customer-error" aria-live="polite" aria-atomic="true">
            {state.errors?.customerId &&
              state.errors.customerId.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div> */}
        </div>
  
        {/* Nombre */}
        <div className="mb-4">
          <label htmlFor="name" className="mb-2 block text-sm font-medium">
            Nombre
          </label>
          <input
            type="text"
            name="name"
            id="name"
            className="block w-full rounded-md border border-gray-200 py-2 px-3 text-sm outline-2 placeholder:text-gray-500"
            placeholder="Nuevo Nombre"
            aria-describedby="name-error"
          />
          {/*  <div id="name-error" aria-live="polite" aria-atomic="true">
            {state.errors?.name &&
              state.errors.name.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div> */}
        </div>
          
      </div>
      <div className="mt-6 flex justify-end gap-4">
        <Link
          href="/utils/actions/products"
          className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
        >
          Cancelar
        </Link>
        <button className="flex h-10 items-center rounded-lg bg-blue-400 px-4 text-sm text-white font-medium transition-colors hover:bg-blue-500" type="submit">Editar</button>
      </div>
    </form>
  );
}
