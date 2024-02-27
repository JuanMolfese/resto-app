import { fetchRubro } from '../../../../utils/actions/rubros/fetchs';
import FormUpdateRubro from '../../../../../components/Rubro/update-form';
import {Rubro} from '../../../../utils/models/types/rubro';

export default function UpdateRubroPage({params,}:{params: {id: number};}) {
   
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

  // Función para obtener los rubros y renderizar el componente
  const renderFormUpdateRubro = async () => {
    
    const infoRubro: Rubro | null = await getRubroInfo(id);
    if (infoRubro !== null) {
      return <FormUpdateRubro infoRubro={infoRubro} />;
    } else {      
      return <div>Error: No se pudo obtener la información del rubro.</div>;
    }
  };
  return (
      <>      
        {renderFormUpdateRubro()}
      </>
  );
}