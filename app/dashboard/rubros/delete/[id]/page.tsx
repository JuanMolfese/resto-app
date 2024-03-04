import FormDeleteRubro from '../../../../../components/Rubro/delete-form';
import {Rubro} from '../../../../utils/models/types/rubro';
import { fetchRubro } from '../../../../utils/actions/rubros/fetchs';

export default function DeleteRubroPage({params,}:{params: {id: number};}) {
   
  const id = params.id;

  const getRubroInfo = async (id:number) : Promise<Rubro | null>  => {
    try{
      const rubro = await fetchRubro(id);       
      return rubro; 
    }catch (error) {
      console.error('Error en el fetch de los datos del rubro',error);
      return null;
    }
  };

  const renderFormDeleteRubro = async () => {
  
    const infoRubro: Rubro | null = await getRubroInfo(id);    
    if (infoRubro !== null) {
      return <FormDeleteRubro infoRubro={infoRubro}/>;
    } else {      
    return <div>Error: No se pudo obtener la información del rubro.</div>;
  }
} ;

  return (
    <>      
      {renderFormDeleteRubro()}
    </>
  );
}