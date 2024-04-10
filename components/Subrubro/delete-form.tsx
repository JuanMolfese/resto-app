"use client";

import Link from "next/link";
import { useRouter } from 'next/navigation';
import deleteSubrubro from "../../app/utils/actions/subrubros/delete";
import React from "react";
import { Subrubro } from "../../app/utils/models/types/subrubro";

interface FormDeleteSubrubroProps {
  infoSubrubro: Subrubro;
}

export default function FormDeleteSubrubro({ infoSubrubro }: FormDeleteSubrubroProps) {
  
  const router = useRouter();     

  const handleDelete = async (event: React.FormEvent<HTMLFormElement>) => { 
    event.preventDefault();           
    try {
      const res = await deleteSubrubro(infoSubrubro.id);
      if(res?.success){       
        router.push("/dashboard/subrubros");
        router.refresh();
      } else {            
        alert("Error al eliminar el subrubro");
      }
    } catch(error) {
      console.error("Error al eliminar el subrubro:", error);
    }
  };
     

  return (
    <>   
    <form className="bg-gray-50 lg:w-[500px] my-4 mx-2 rounded-md" onSubmit={handleDelete}>
        <input type="number" id="id" className="hidden" defaultValue={infoSubrubro.id} name="id"/> {/* Paso id al utils/actions/subrubros/delete */}
      <div className="flex justify-between items-center px-4 py-2 border-b border-gray-200 sm:px-6">
        <h2 className="text-lg leading-6 font-medium text-gray-900 pointer-events-none">
          Eliminar SubrRubro {infoSubrubro.nombre}
        </h2>
      </div>
      
      <div className="mt-6 flex justify-end gap-4">
        <Link
          href="/dashboard/subrubros"
          className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
        >
          Cancelar
        </Link>
        <button 
        className="flex h-10 items-center rounded-lg bg-red-400 px-4 text-sm text-white font-medium transition-colors hover:bg-red-500" 
        type="submit">
         Eliminar
        </button>
      </div>
    </form>
    </>
  );
}