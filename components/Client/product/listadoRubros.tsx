import { useGetRubrosQuery } from "@/redux/services/rubrosApi"
import Spinner from "../../spinner";
import { Rubro } from "../../../app/utils/models/types/rubro";

export default function ListadoRubros() {

  const { data: rubros, error, isLoading } = useGetRubrosQuery();

  if (isLoading) {
    return (
      <Spinner />
    )
  }

  const handleClick = (rubro: Rubro) => {
    
    history.pushState({}, '', `/productos?query=${rubro.nombre}`);
  }

  const handleClickTodos = () => {
    history.pushState({}, '', `/productos`);
  }

  return (
    <div className="flex justify-center mt-4 mb-2">
      <ul className="flex flex-wrap py-2">
        {rubros?.map(rubro => (
          <li className="p-1 hover:border-b-4 border-blue-700 cursor-pointer w-28 h-10 hover:font-bold text-center" key={rubro.id} onClick={() => handleClick(rubro)}>{rubro.nombre}</li>
        ))}
      </ul>
      <div className="flex flex-wrap py-2">
        <div className="p-1 hover:border-b-4 border-blue-700 cursor-pointer w-28 h-10 hover:font-bold text-center" onClick={() => handleClickTodos()}>Todos</div>
      </div>
    </div>
  )
}