"use client";

import Link from "next/link";
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import deleteRubro from "../../app/utils/actions/rubros/delete";
import { Rubro } from "../../app/utils/models/types/rubro";


interface FormDeleteRubroProps {
    infoRubro: Rubro;    
  }

export default function FormDeleteRubro( {infoRubro} : FormDeleteRubroProps) {   
    
    const [error, setError] = useState<string | null>(null);   
    const router = useRouter();   

    const handleDelete = async () => {
        try {
          const response = await deleteRubro(infoRubro.id);
          if (response.error) {
            setError(response.error);
          } else {
            if (response){
              alert("Se ha eliminado el rubro correctamente");              
              router.push('/app/dashboard/rubros'); /* NO ESTA FUNCIONANDO EL ROUTEO */
            };            
            }
        
        } catch (error) {
          console.error('Error al eliminar el rubro:', error);
          setError('Hubo un problema al eliminar el rubro');
        }
    };
     

  return (
    <>
    <div>
        {error && <p>{error}</p>}
    </div>
    
    <form className="bg-gray-50 my-4 mx-2 rounded-md" /* action={deleteSubrubro} */>
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
        <button className="flex h-10 items-center rounded-lg bg-red-400 px-4 text-sm text-white font-medium text-gray-600 transition-colors hover:bg-blue-500" 
         onClick={handleDelete}>
         Eliminar
        </button>
      </div>
    </form>
    </>
  );
}