"use client";

import Link from "next/link";
import { Rubro } from "../../app/utils/models/types/rubro";
import updateRubro from "../../app/utils/actions/rubros/update";
import { useRouter } from 'next/navigation';

interface FormUpdateSubrubroProps {  
  infoRubro: Rubro;  
}

export default function FormUpdateRubro ({ infoRubro }: FormUpdateSubrubroProps) {   
  
  const router = useRouter(); 

  const handleUpdate = async (event : React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const newFormData = new FormData(event.currentTarget);
    const res = await updateRubro(newFormData);
    if(res.success) {
      router.push("/dashboard/rubros");
      router.refresh();
    } else {
      router.push("/dashboard/rubros");
      alert("Error al actualizar el rubro");
    }
  }

  return (
    <form className="bg-gray-50 my-4 lg:w-[500px] mx-2 rounded-md" onSubmit={handleUpdate}>

            <input type="number" id="id" className="hidden" defaultValue={infoRubro.id} name="id"/> {/* Paso id al utils/actions/subrubros/update */}
      
        <div className="flex justify-between items-center px-4 py-2 border-b border-gray-200 sm:px-6">
        <h2 className="text-lg leading-6 font-medium text-gray-900 pointer-events-none">
            Editar Rubro: {infoRubro.nombre}
        </h2>
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
            defaultValue={infoRubro?.nombre} 
            aria-describedby="name-error"
            />          
        </div>          
      
      <div className="mt-6 flex justify-end gap-4">
        <Link
          href="/dashboard/rubros"
          className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
        >
          Cancelar
        </Link>
        <button className="flex h-10 items-center rounded-lg bg-blue-400 px-4 text-sm text-white font-medium text-gray-600 transition-colors hover:bg-blue-500" 
        type="submit">
         Modificar
        </button>
      </div>
    </form>
  );
}