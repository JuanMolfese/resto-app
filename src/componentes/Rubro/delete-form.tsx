"use client";

import Link from "next/link";
import { useRouter } from 'next/navigation';
import { Rubro } from "../../app/utils/models/types/rubro";
import React from "react";
import { useDeleteRubroMutation } from "@/redux/services/rubrosApi";
import { myToastError } from "../myToast";

interface FormDeleteRubroProps {
    infoRubro: Rubro;    
  }

export default function FormDeleteRubro( {infoRubro} : FormDeleteRubroProps) {   
    
  const router = useRouter();   
  const [deleteRubro] = useDeleteRubroMutation();

  const handleDelete = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();           
    try {
      deleteRubro(infoRubro.id).then((res: any) => {
        if(res.status === 200){       
          router.push("/dashboard/rubros");
        router.refresh();
        } else {            
          myToastError("Error al eliminar el rubro");        
        }
      });
    } catch(error) {
      myToastError("Error al eliminar el rubro");
    }
  }; 
     

  return (
   
    <form className="bg-gray-50 my-4 lg:w-[500px] mx-2 rounded-md" onSubmit={handleDelete}>
        <label htmlFor="id" className="sr-only">Rubro ID</label>
        <input type="number" id="id" className="hidden" defaultValue={infoRubro.id} name="id"/> {/* Paso id al utils/actions/subrubros/delete */}
      <div className="flex justify-between items-center px-4 py-2 border-b border-gray-200 sm:px-6">
        <h2 className="text-lg leading-6 font-medium text-gray-900 pointer-events-none">
          Eliminar Rubro {infoRubro.nombre}
        </h2>
      </div>
      
      <div className="mt-6 flex justify-end gap-4">
        <Link
          href="/dashboard/rubros"
          className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
        >
          Cancelar
        </Link>
        < button 
        className="flex h-10 items-center rounded-lg bg-red-400 px-4 text-sm text-white font-medium transition-colors hover:bg-red-500" 
        type="submit">
         Eliminar
        </button>
      </div>
    </form>  
  );
}