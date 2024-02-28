import FormDeleteRubro from '../../../../components/Rubro/delete-form';

export default function DeleteRubroPage({params,}:{
  params: {id: number};
}) {
   
  const id = params.id;

  // Función para obtener los rubros y renderizar el componente
  const renderFormDeleteRubro = async () => {
    return <FormDeleteRubro id={id}/>;
  };

  return (
    <>      
      {renderFormDeleteRubro()}
    </>
  );
}