"use client";

import { useFormState } from "react-dom";
import updateProduct from "../../app/utils/actions/products/update";
import { ProductoDetail } from "../../app/utils/models/types/producto";
import { ButtonOk } from "../../ui/button";
import { Rubro } from "../../app/utils/models/types/rubro";
import { Subrubro } from "../../app/utils/models/types/subrubro";
import { useState } from "react";
import deleteProduct from "../../app/utils/actions/products/delete";

export default function CardProduct({
  product,
  rubros,
  subrubros,
}: {
  product: ProductoDetail;
  rubros?: Rubro[];
  subrubros?: Subrubro[];
}) {
  const [subrubrosFilter, setSubrubrosFilter] = useState(subrubros);

  const handleEdit = (e: any) => {
    e.preventDefault();
    const input = document.querySelector(`#input-name-product-${product.id}`);
    const name = document.querySelector(`#name-product-${product.id}`);
    const form = document.querySelector(`#formEdit-${product.id}`);
    if (input?.classList.contains("hidden")) {
      input?.classList.remove("hidden");
      name?.classList.add("hidden");
      form?.classList.add("bg-gray-100");
    } else {
      input?.classList.add("hidden");
      name?.classList.remove("hidden");
      form?.classList.remove("bg-gray-100");
    }

    const btnsEdit = document.querySelector(`#btns-edit-${product.id}`);
    const btnsConfirm = document.querySelector(`#btns-confirm-${product.id}`);
    if (btnsConfirm?.classList.contains("hidden")) {
      btnsConfirm?.classList.remove("hidden");
      btnsEdit?.classList.add("hidden");
    } else {
      btnsConfirm?.classList.add("hidden");
      btnsEdit?.classList.remove("hidden");
    }
  };

  const handleUpdate = async (e: any) => {
    const form = document.querySelector(`#formEdit-${product.id}`);
    const formData = new FormData(form as HTMLFormElement);
    const res = await updateProduct(product.id, formData);
    res.success ? location.reload() : alert(res.message);
  };

  const handleDelete = async (e: any) => {
    e.preventDefault();
    const res = await deleteProduct(product.id);
    res.success ? location.reload() : alert(res.message);
  };

  return (
    <form
      id={`formEdit-${product.id}`}
      className="shadow-md rounded-md w-80 m-2 flex flex-col"
      action={handleUpdate}
    >
      <div className="p-3 flex-auto">
        <div id={`name-product-${product.id}`}>
          <h3 className="text-lg font-semibold py-1">{product.nombre}</h3>

          <p className="text-xs">
            {product.rubro_nombre} {`->`} {product.subrubro_nombre}
          </p>
          <p className="text-sm">{product.descripcion}</p>
          <p className="text-sm">Stock: {product.stock}</p>
          <p className="text-sm">Precio: ${product.precio}</p>
          {/* <p className="text-sm text-gray-500">Descripcion</p> */}
        </div>
        <input
          type="hidden"
          name="productId"
          id="productId"
          value={product.id}
        />
        <div
          className="hidden flex flex-col gap-2"
          id={`input-name-product-${product.id}`}
        >
          {/* <label htmlFor="name" className="mb-2 block text-sm font-medium">
            Nombre
          </label> */}
          <input
            type="text"
            name="name"
            id="name"
            className="block w-full rounded-md border border-gray-200 py-1 px-3 text-sm outline-2 placeholder:text-gray-500"
            placeholder="Nombre"
            aria-describedby="name-error"
            defaultValue={product.nombre}
            required
          />
          <div className="flex items-center">
            <label htmlFor="rubroId" className="mr-2 block text-xs">
              Rubro
            </label>

            <select
              id="rubro"
              name="rubroId"
              className="peer block w-full rounded-md border border-gray-200 py-1 px-2 text-xs outline-2 placeholder:text-gray-500"
              defaultValue={product.rubro_id}
              aria-describedby="customer-error"
              onChange={(e) => {
                const val = parseInt(e.target.value);
                subrubros &&
                  subrubros.length > 0 &&
                  setSubrubrosFilter(
                    subrubros.filter((subrubro) => subrubro.rubro_id === val)
                  );
              }}
              required
            >
              {rubros?.map((rubro) => (
                <option key={rubro.id} value={rubro.id} className="py-2">
                  {rubro.nombre}
                </option>
              ))}
            </select>
          </div>
          <div className="flex items-center">
            <label htmlFor="rubroId" className="mr-2 block text-xs">
              Subrubro
            </label>

            <select
              id="subrubro"
              name="subrubroId"
              className="peer block w-full rounded-md border border-gray-200 py-1 px-2 text-xs outline-2 placeholder:text-gray-500"
              defaultValue={product.subrubro_id}
              aria-describedby="customer-error"
              required
            >
              {subrubrosFilter?.map((subrubro) => (
                <option key={subrubro.id} value={subrubro.id} className="py-2">
                  {subrubro.nombre}
                </option>
              ))}
            </select>
          </div>
          <div className="flex items-center">
            <label className="text-xs mr-2" htmlFor="stock">
              Stock
            </label>
            <input
              type="number"
              name="stock"
              id="stock"
              className="block w-full rounded-md border border-gray-200 py-1 px-3 text-sm outline-2 placeholder:text-gray-500"
              placeholder="Stock"
              aria-describedby="stock"
              defaultValue={product.stock}
              min={0}
              required
            />
          </div>
          <div className="flex items-center">
            <label className="text-xs mr-2" htmlFor="precio">
              Precio
            </label>
            <input
              type="number"
              name="precio"
              id="precio"
              className="block w-full rounded-md border border-gray-200 py-1 px-3 text-sm outline-2 placeholder:text-gray-500"
              placeholder="Precio"
              aria-describedby="precio"
              defaultValue={product.precio}
              min={0}
              required
            />
          </div>
        </div>
      </div>
      <div className="p-3 flex" id={`btns-edit-${product.id}`}>
        <ButtonOk
          className="bg-blue-500 text-white transition-colors rounded-lg px-4 py-2 hover:bg-blue-600"
          onClick={handleEdit}
        >
          <span className="flex" id="btn-edit">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="w-5 h-5 mr-2"
            >
              <path d="m2.695 14.762-1.262 3.155a.5.5 0 0 0 .65.65l3.155-1.262a4 4 0 0 0 1.343-.886L17.5 5.501a2.121 2.121 0 0 0-3-3L3.58 13.419a4 4 0 0 0-.885 1.343Z" />
            </svg>
            Editar
          </span>
        </ButtonOk>
        <button className="bg-red-500 text-white transition-colors rounded-lg px-4 py-2 ml-4 hover:bg-red-600" onClick={handleDelete}>
          <span className="flex">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="w-5 h-5 mr-2"
            >
              <path
                fillRule="evenodd"
                d="M8.75 1A2.75 2.75 0 0 0 6 3.75v.443c-.795.077-1.584.176-2.365.298a.75.75 0 1 0 .23 1.482l.149-.022.841 10.518A2.75 2.75 0 0 0 7.596 19h4.807a2.75 2.75 0 0 0 2.742-2.53l.841-10.52.149.023a.75.75 0 0 0 .23-1.482A41.03 41.03 0 0 0 14 4.193V3.75A2.75 2.75 0 0 0 11.25 1h-2.5ZM10 4c.84 0 1.673.025 2.5.075V3.75c0-.69-.56-1.25-1.25-1.25h-2.5c-.69 0-1.25.56-1.25 1.25v.325C8.327 4.025 9.16 4 10 4ZM8.58 7.72a.75.75 0 0 0-1.5.06l.3 7.5a.75.75 0 1 0 1.5-.06l-.3-7.5Zm4.34.06a.75.75 0 1 0-1.5-.06l-.3 7.5a.75.75 0 1 0 1.5.06l.3-7.5Z"
                clipRule="evenodd"
              />
            </svg>
            Eliminar
          </span>
        </button>
      </div>
      <div className="p-3 hidden" id={`btns-confirm-${product.id}`}>
        <button
          type="submit"
          className="bg-blue-500 text-white transition-colors rounded-lg px-4 py-2 hover:bg-blue-600"
        >
          <span className="flex" id="btn-edit">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="w-5 h-5"
            >
              <path
                fillRule="evenodd"
                d="M16.704 4.153a.75.75 0 0 1 .143 1.052l-8 10.5a.75.75 0 0 1-1.127.075l-4.5-4.5a.75.75 0 0 1 1.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 0 1 1.05-.143Z"
                clipRule="evenodd"
              />
            </svg>
            Confirmar
          </span>
        </button>
        <button
          className="bg-red-500 text-white transition-colors rounded-lg px-4 py-2 ml-4 hover:bg-red-600"
          onClick={handleEdit}
        >
          <span className="flex">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="w-5 h-5"
            >
              <path d="M6.28 5.22a.75.75 0 0 0-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 1 0 1.06 1.06L10 11.06l3.72 3.72a.75.75 0 1 0 1.06-1.06L11.06 10l3.72-3.72a.75.75 0 0 0-1.06-1.06L10 8.94 6.28 5.22Z" />
            </svg>
            Cancelar
          </span>
        </button>
      </div>
    </form>
  );
}
