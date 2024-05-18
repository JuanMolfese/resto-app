
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
    <div className="flex flex-nowrap overflow-x-auto mt-4 mb-2 max-w-[100vw]">
      <ul className="flex flex-nowrap py-2">
        {rubros?.map(subrubro => (
          <li className="p-1 hover:border-b-4 border-blue-700 cursor-pointer w-36 h-10 hover:font-bold text-center" key={subrubro.id} onClick={() => handleClick(subrubro)}>{subrubro.nombre}</li>
        ))}
      </ul>
      <div className="flex flex-wrap py-2">
        <div className="p-1 hover:border-b-4 border-blue-700 cursor-pointer w-36 h-10 hover:font-bold text-center" onClick={() => handleClickTodos()}>Todos</div>
      </div>
    </div>
  )
}