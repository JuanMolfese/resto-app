"use client"
import { useDeleteSubrubroMutation, useGetSubrubrosByIdQuery } from '@/redux/services/subrubrosApi';
import Link from "next/link";
import { useRouter } from 'next/navigation';
import { myToastError, myToastSuccess } from '../../../../../components/myToast';


export default function DeleteSubrubroPage({params}:{params: {id: string};}) {
  
  const router = useRouter();  
  const id = params.id;
  const { data: subrubro, error, isLoading } = useGetSubrubrosByIdQuery(id);

  const [deleteSubrubro] = useDeleteSubrubroMutation();
 
  const handleDelete = async (e: any) => {
    e.preventDefault();  
    const id = parseInt(e.target.id.value);       
    deleteSubrubro(id).then((res: any) => {
      if(res.error){       
        myToastError("Error al eliminar el rubro");
      } else {
        myToastSuccess("Rubro eliminado");
        router.push("/dashboard/subrubros");
        router.refresh();
      }
    });
  }; 
    

  return (
    <>   
    <form className="bg-gray-50 lg:w-[500px] my-4 mx-2 rounded-md" onSubmit={handleDelete}>
        <label htmlFor="id" className="sr-only">SubRubro ID</label>
        <input type="number" id="id" className="hidden" defaultValue={subrubro?.id} name="id"/> {/* Paso id al utils/actions/subrubros/delete */}
      <div className="flex justify-between items-center px-4 py-2 border-b border-gray-200 sm:px-6">
        <h2 className="text-lg leading-6 font-medium text-gray-900 pointer-events-none">
          Eliminar SubRubro {subrubro?.nombre}
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