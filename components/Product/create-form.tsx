"use client";

import Link from "next/link";
import Image from "next/image";
import { Rubro } from "../../app/utils/models/types/rubro";
import { Subrubro } from "../../app/utils/models/types/subrubro";
import { useState } from "react";
import createProduct from "../../app/utils/actions/products/create";
import { useFormState } from "react-dom";
import { useRouter } from "next/navigation";


export default function FormProduct({
  rubros,
  subrubros,
}: {
  rubros?: Rubro[];
  subrubros?: Subrubro[];
}) {
  
  const [subrubrosFilter, setSubrubrosFilter] = useState(subrubros);
  const router = useRouter();
  const  [file, setFile] = useState<File | null>(null);

  const handleCreate = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const newFormData = new FormData(event.currentTarget);      
    const res = await createProduct(newFormData);
    if (res.success) {
      router.push("/dashboard/products");
      router.refresh();
    } else {
      alert("Error al crear el producto");
    }

  }

  return (
    <form id="formCreate" className="bg-gray-50 my-4 mx-96 rounded-md" onSubmit={handleCreate}>
      <div className="flex justify-between items-center px-4 py-2 border-b border-gray-200 sm:px-6">
        <h2 className="text-lg leading-6 font-medium text-gray-900">
          Crear producto
        </h2>
      </div>
      <div className="rounded-md p-4 md:p-6">
        {/* Rubro */}
        <div className="mb-4">
          <label htmlFor="customer" className="mb-2 block text-sm font-medium">
            Elegir rubro
          </label>
          <div className="relative">
            <select
              id="rubro"
              name="rubroId"
              className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              defaultValue=""
              aria-describedby="customer-error"
              onChange={(e) => {
                const val = parseInt(e.target.value);
                subrubros && subrubros.length > 0 &&
                setSubrubrosFilter(subrubros.filter((subrubro) => subrubro.rubro_id === val));
              }}
              required
            >
              <option value="" disabled>
                Seleccionar rubro
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
            Elegir subrubro
          </label>
          <div className="relative">
            <select
              id="subrubro"
              name="subrubroId"
              className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              defaultValue=""
              aria-describedby="customer-error"
            /*   onChange={(e) => {
                const sb = subrubros?.find((subrubro) => subrubro.id === parseInt(e.target.value));
                setRubrosFilter(rubros?.filter((rubro) => rubro.id === sb?.rubro_id));
              }} */
              required
            >
              <option value="" disabled>
                Seleccionar subrubro
              </option>
              {subrubrosFilter?.map((subrubro) => (
                <option key={subrubro.id} value={subrubro.id} className="py-2">
                  {subrubro.nombre} 
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
            placeholder="Nombre"
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
        <div className="mb-4">
          <label className="mb-2 block text-sm font-medium" htmlFor="productImage">Imagen</label>
          <input 
            type="file"
            className="block w-80 rounded-md py-2 px-3 text-sm outline-2 placeholder:text-gray-500"
            accept=".png,.jpg,.jpeg"
            id="productImage"
            name="productImage"
            onChange={(e) => {
              const selectedFile = e.target.files?.[0];
              if (selectedFile){
                setFile(selectedFile);
              } 
            }}
          />
          {file && <Image
            className="object-contain mx-auto my-5"
            width={180} height={180}
            src={URL.createObjectURL(file)}
            alt="imagen del producto" 
            />
          }            
        </div>
      </div>
      <div className="mr-6 flex justify-end gap-4">
        <Link
          href="/dashboard/products"
          className="flex mb-6 h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
        >
          Cancelar
        </Link>
        <button
          className="flex h-10 items-center rounded-lg bg-blue-400 px-4 text-sm text-white font-medium transition-colors hover:bg-blue-500"
          type="submit"
        >
          Crear
        </button>
      </div>
    </form>
  );
}
