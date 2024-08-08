"use client";

import { ProductoDetail } from "../../../app/utils/models/types/producto";
import { ButtonOk } from "../../../ui/button";
import { Rubro } from "../../../app/utils/models/types/rubro";
import { Subrubro } from "../../../app/utils/models/types/subrubro";
import { useState } from "react";
import deleteProduct from "../../app/utils/actions/products/delete";
import Image from "next/image";
import { useRemoveProductMutation, useUpdateProductMutation } from "@/redux/services/productsApi";
import { myToastError, myToastSuccess } from "../myToast";
import Spinner from "../spinner";

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
  const  [file, setFile] = useState<File | null>(null); 
  const [removeProduct] = useRemoveProductMutation();
  const [updateProduct] = useUpdateProductMutation();
  const [image, setImage] = useState(product.image);
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

  const handleUpdate = () => {
    const form = document.querySelector(`#formEdit-${product.id}`);
    
    const formData = new FormData(form as HTMLFormElement);

    if (file) {
      formData.append('productImage', file);
    } else {
      formData.append('productImage', image); // Mantener la imagen actual si no hay una nueva seleccionada
    }
    try {
      updateProduct({id: product.id, update: formData}).then((res: any) => {
       (res.data.status === 200) ? 
        myToastSuccess("Producto actualizado. Espere por favor")
        : myToastError("Error al actualizar el producto. Espere por favor"); 
        setInterval(() =>
          location.reload(), 3000);
      });
    } catch (error) {
      console.error
    }
  };

  const handleDelete = (e: any) => {
    e.preventDefault();
    /* const res = await deleteProduct(product.id);
    res.success ? location.reload() : alert(res.message); */
    try {
      removeProduct(product.id).then((res: any) => {
        (res.data.status === 200) ? 
        myToastSuccess("Producto eliminado")
        : myToastError("Error al eliminar el producto");
        location.reload();
      });
      
    } catch (error) {
      console.error
    }
  };

  return (
    <form
      id={`formEdit-${product.id}`}
      className={`shadow-md rounded-md w-80 m-2 flex flex-col justify-between ${product.stock < product.stock_minimo ? "bg-red-100" : "bg-white"}`}
      action={handleUpdate}
    >
      <div className="px-3 my-0">
        <div id={`name-product-${product.id}`} className="flex justify-evenly gap-4">
          <div className="mx-3">
            <p className="text-lg font-semibold py-1 max-w-44 line-clamp-1">{product.nombre}</p>

            <p className="text-xs">
              {product.rubro_nombre} {`->`} {product.subrubro_nombre}
            </p>
            <p className="text-sm py-0.5">{product.descripcion}</p>
            <p className="text-sm py-0.5">Stock: {product.stock} - Min: {product.stock_minimo}</p>
            <p className="text-sm py-0.5">Precio: ${product.precio}</p>                           
            {/* <p className="text-sm text-gray-500">Descripcion</p> */}         
          </div>
          <div className="content-center">
            {/* {product.image && typeof product.image === 'string' && product.image.trim() !== '' &&  */}
              <Image 
              src={product.image ? product.image : "/no-image.png"}
              className="w-auto h-auto rounded-md max-h-24"
                width={80}
                height={80}
                alt="Imagen del producto"            
              />
          </div>
        </div>
        
        

        {/* HIDDEN MENUS */}
        <input
          type="hidden"
          name="productId"
          id="productId"
          value={product.id}
        />
        <div className="hidden my-0" id={`input-name-product-${product.id}`}>
          {/* <label htmlFor="name" className="mb-2 block text-sm font-medium">
            Nombre
          </label> */}
          <input
            type="text"
            name="name"
            id="name"
            className="block w-full rounded-md border border-gray-200 py-1 mb-1 px-3 text-sm outline-2 placeholder:text-gray-500"
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
              className="peer mb-1 block w-full rounded-md border border-gray-200 py-1 px-2 text-xs outline-2 placeholder:text-gray-500"
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
              className="peer mb-1 block w-full rounded-md border border-gray-200 py-1 px-2 text-xs outline-2 placeholder:text-gray-500"
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
            <>
              <label className="text-xs mr-2" htmlFor="stock">
                Stock
              </label>
              <input
                type="number"
                name="stock"
                id="stock"
                className="block mb-1 w-full rounded-md border border-gray-200 py-1 px-3 text-sm outline-2 placeholder:text-gray-500"
                placeholder="Stock"
                aria-describedby="stock"
                defaultValue={product.stock}
                min={0}
                required
              />
              <label className="text-xs ml-2 mr-2" htmlFor="stock_minimo">
                Min
              </label>
              <input
                type="number"
                name="stock_minimo"
                id="stock_minimo"
                className="block mb-1 w-full rounded-md border border-gray-200 py-1 px-3 text-sm outline-2 placeholder:text-gray-500"
                placeholder="Stock minimo"
                aria-describedby="stock_minimo"
                defaultValue={product.stock_minimo}
                min={0}
                required
              />
            </>
          </div>          
          <div className="flex items-center">
            <label className="text-xs mr-2" htmlFor="precio">
              Precio
            </label>
            <input
              type="number"
              name="precio"
              id="precio"
              className="block w-full mb-1 rounded-md border border-gray-200 py-1 px-3 text-sm outline-2 placeholder:text-gray-500"
              placeholder="Precio"
              aria-describedby="precio"
              defaultValue={product.precio}
              min={0}
              required
            />
          </div>
          <div className="mb-4">
            <label className="mb-2 block text-sm font-medium" htmlFor="productImage">Imagen</label>
            <input 
              type="file"
              className="w-full rounded-md py-2 px-3 text-sm outline-2 placeholder:text-gray-500"
              accept=".png,.jpg,.jpeg"
              id="productImage"
              name="productImage"
              onChange={(e) => {
                const selectedFile = e.target.files?.[0];
                if (selectedFile){
                  setFile(selectedFile);
                  setImage(URL.createObjectURL(selectedFile));
                } 
              }}
            />
            {image && <Image
              className="object-contain mx-auto my-5"
              width={180} height={180}
              src={image}
              alt="imagen del producto" 
              />
            }         
          </div>
        </div>
      </div>
      <div className="px-3 py-5 flex justify-center" id={`btns-edit-${product.id}`}>
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
      <div className="px-3 py-5 mx-auto hidden" id={`btns-confirm-${product.id}`}>
        <button
          type="submit"
          className="bg-green-500 text-white transition-colors rounded-lg px-4 py-2 hover:bg-green-600"
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
          className="bg-orange-400 text-white transition-colors rounded-lg px-4 py-2 ml-4 hover:bg-orange-600"
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
