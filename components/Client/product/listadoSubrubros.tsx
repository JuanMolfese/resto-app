
import Spinner from "../../spinner";
import { Rubro } from "../../../app/utils/models/types/rubro";
import { useGetSububrosQuery } from "@/redux/services/subrubrosApi";
import { Subrubro } from "../../../app/utils/models/types/subrubro";

export default function ListadoSubrubros() {

  const { data: rubros, error, isLoading } = useGetSububrosQuery();

  if (isLoading) {
    return (
      <Spinner />
    )
  }

  const handleClick = (subrubro: Subrubro) => {
    
    history.pushState({}, '', `/productos?query=${subrubro.nombre}`);
  }

  const handleClickTodos = () => {
    history.pushState({}, '', `/productos`);
  }

  return (
    <div className="overflow-x-auto mt-4 mb-2 max-w-[100vw]">
      <ul className="flex flex-nowrap py-2 px-2 gap-2">
        {rubros?.map(subrubro => (
          <li className="p-1 hover:border-b-4 border-blue-700 cursor-pointer hover:font-bold text-center" key={subrubro.id} onClick={() => handleClick(subrubro)}>{subrubro.nombre}</li>
        ))}
        <div className="flex flex-wrap">
          <div className="p-1 hover:border-b-4 border-blue-700 cursor-pointer hover:font-bold text-center" onClick={() => handleClickTodos()}>Todos</div>
        </div>
      </ul>
    </div>
  )
}