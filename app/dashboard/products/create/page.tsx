import Link from "next/link";
import fetchRubros from "../../../utils/actions/rubros/page";
import fetchSubrubros from "../../../utils/actions/subrubros/page";
import FormProduct from "../../../../components/Product/create-form";

export default async function CreateProduct() {
  const rubros = await fetchRubros();
  const subrubros = await fetchSubrubros();

  return (
    <div>
      <h1>Crear producto</h1>
      <FormProduct rubros={rubros} subrubros={subrubros} />
    </div>
  );
}
