import fetchRubros from "../../../utils/actions/rubros/fetchs";
import FormSubrubro from "../../../../components/Subrubro/create-form";

export default async function CreateSubrubro() {
  const rubros = await fetchRubros();
  
  return(
    <>
    <FormSubrubro rubros={rubros}/>
    </>  
  );
}
