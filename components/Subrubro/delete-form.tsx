"use client";

import Link from "next/link";
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import deleteSubrubro from "../../app/utils/actions/subrubros/delete";
import { Rubro } from "../../app/utils/models/types/rubro";
import React from "react";

interface FormDeleteSubrubroProps {
  id: number;
}

export default function FormDeleteSubrubro({ id }: FormDeleteSubrubroProps) {
  
  const router = useRouter();   

  const handleDelete = async (event: React.FormEvent<HTMLFormElement>) => { 
    event.preventDefault();   
    const newFormData = new FormData(event.currentTarget); 
    console.log(newFormData);
    try {
      const res = await deleteSubrubro(id); // Pasa el id directamente
      if(res?.success){
        router.push("/dashboard/subrubros");
      } else {            
        alert("Error al eliminar el subrubro");
      }
    } catch(error) {
      console.error("Error al eliminar el subrubro:", error);
    }
  };
     

  return (
    <>   
    <form className="bg-gray-50 my-4 mx-2 rounded-md" onSubmit={handleDelete}>
        <input type="number" id="id" className="hidden" defaultValue={id} name="id"/> {/* Paso id al utils/actions/subrubros/delete */}
      <div className="flex justify-between items-center px-4 py-2 border-b border-gray-200 sm:px-6">
        <h2 className="text-lg leading-6 font-medium text-gray-900 pointer-events-none">
          Eliminar SubrRubro 
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
        className="flex h-10 items-center rounded-lg bg-red-400 px-4 text-sm text-white font-medium text-gray-600 transition-colors hover:bg-blue-500" 
        type="submit">
         Eliminar
        </button>
      </div>
    </form>
    </>
  );
}