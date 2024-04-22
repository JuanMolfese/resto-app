import FormDeleteSubrubro from '../../../../../components/Subrubro/delete-form';
import { fetchInfoSubRubro } from '../../../../utils/actions/subrubros/fetchs';
import { Subrubro } from '../../../../utils/models/types/subrubro';

export default function DeleteSubrubroPage({params,}:{
  params: {id: number};
}) {
   
  const id = params.id;

  const getSubRubroInfo = async (id:number) : Promise<Subrubro | null>  => {
    try{
      const subrubro = await fetchInfoSubRubro(id);       
      return subrubro; 
    }catch (error) {
      console.error('Error en el fetch de los datos del subrubro',error);
      return null;
    }
  };

  // Función para obtener los rubros y renderizar el componente
  const renderFormDeleteSubrubro = async () => {

    const infoSubRubro:Subrubro | null = await getSubRubroInfo(id);
    if(infoSubRubro !== null){
    return <FormDeleteSubrubro infoSubrubro={infoSubRubro}/>;
    }else {      
      return <div>Error: No se pudo obtener la información del subrubro.</div>;
    }
  };

  return (
    <div className="flex justify-center">       
      {renderFormDeleteSubrubro()}
    </div>
  );
}