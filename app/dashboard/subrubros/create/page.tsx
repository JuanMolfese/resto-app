"use client";

import { useGetRubrosQuery } from "@/redux/services/rubrosApi";
import FormSubrubro from "@/componentes/Subrubro/create-form";
import Spinner from "@/componentes/spinner";

export default function CreateSubrubro() {
  
  const {data: rubros, isLoading, error} = useGetRubrosQuery();
  

  if(isLoading) return <Spinner />;
  if(error) return <div>Error</div>;
  
  return(
    <div className="flex justify-center">
      <FormSubrubro rubros={rubros}/>
    </div>  
  );
}
