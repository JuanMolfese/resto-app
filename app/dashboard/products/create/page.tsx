"use client"
import { useGetRubrosQuery } from "@/redux/services/rubrosApi";
import FormProduct from "../../../../components/Product/create-form";
import { useGetSububrosQuery } from "@/redux/services/subrubrosApi";
import Spinner from "../../../../components/spinner";

export default function CreateProduct() {
  const {data: rubros, error: errorRubros, isLoading: loadingRubros} = useGetRubrosQuery();
  const {data: subrubros, error: errorSubrubros, isLoading: loadingSubrubros} = useGetSububrosQuery();

  if (loadingRubros || loadingSubrubros) {
    return <Spinner />;
  }

  return (
    <div>
      <FormProduct rubros={rubros} subrubros={subrubros} />
    </div>
  );
}
