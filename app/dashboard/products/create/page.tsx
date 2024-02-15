import FormProduct from "../../../../components/Product/create-form";
import fetchRubros from "../../../utils/actions/rubros/fetchs";
import fetchSubrubros from "../../../utils/actions/subrubros/fetchs";

export default async function CreateProduct() {
  const rubros = await fetchRubros();
  const subrubros = await fetchSubrubros();

  return (
    <div>
      <FormProduct rubros={rubros} subrubros={subrubros} />
    </div>
  );
}
