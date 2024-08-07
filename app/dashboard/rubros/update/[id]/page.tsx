"use client";

import { useGetRubroByIdQuery, useUpdateRubroMutation } from "@/redux/services/rubrosApi";
import Spinner from "../../../../../components/spinner";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { myToastError, myToastSuccess } from "../../../../../components/myToast";

export default function UpdateRubroPage({
  params,
}: {
  params: { id: string };
}) {
  const id = params.id;
  const { data: rubro, error, isLoading, refetch } = useGetRubroByIdQuery(id);
  const [updateRubro] = useUpdateRubroMutation();
  const router = useRouter();
  
  if (isLoading) return <Spinner />;

  if (error)
    return <div>Error: No se pudo obtener la información del rubro.</div>;

  const handleUpdate = (e: any) => {
    e.preventDefault();
    const name = e.target.name.value;
    const id = parseInt(e.target.id.value);
    updateRubro({name: name, id: id}).then((res: any) => {
      if (res.error) {
        myToastError("Error al actualizar el rubro");
      } else {
        myToastSuccess("Rubro actualizado correctamente");
        refetch();
        router.push("/dashboard/rubros");
        router.refresh();
      }
    });
  };

  return (
    <div className="flex justify-center">
      <form
        className="bg-gray-50 py-4 px-6 my-4 lg:w-[500px] mx-2 rounded-md"
        onSubmit={handleUpdate}
      >
        <input
          type="number"
          id="id"
          className="hidden"
          defaultValue={rubro?.id}
          name="id"
        />{" "}
        {/* Paso id al utils/actions/subrubros/update */}
        <div className="flex justify-between items-center px-4 py-2 border-b border-gray-200 sm:px-6">
          <h2 className="text-lg leading-6 font-medium text-gray-900 pointer-events-none">
            Editar Rubro: {rubro?.nombre}
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
            defaultValue={rubro?.nombre}
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
          <button
            className="flex h-10 items-center rounded-lg bg-blue-400 px-4 text-sm font-medium text-white transition-colors hover:bg-blue-500"
            type="submit"
          >
            Modificar
          </button>
        </div>
      </form>
    </div>
  );
}
