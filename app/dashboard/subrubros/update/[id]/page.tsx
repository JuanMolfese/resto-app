import React, { useState, useEffect } from 'react';
import { Rubro } from "../../../../utils/models/types/rubro";
import fetchRubros from '../../../../utils/actions/rubros/fetchs';
import updateSubrubro from '../../../../utils/actions/subrubros/update';
import FormUpdateSubrubro from '../../../../../components/Subrubro/update-form';

export default function UpdateSubrubroPage({params,}:{
  params: {id: number};
}) {
   
  const id = params.id;

  const getRubros = async () => {
    try {
      const rubros = await fetchRubros(); // Espera a que se resuelva la promesa
      return rubros || []; // Retorna los rubros o un array vacío si no hay datos
    } catch (error) {
      console.error('Error fetching rubros:', error);
      return []; // Retorna un array vacío en caso de error
    }
  };

  // Función para obtener los rubros y renderizar el componente
  const renderFormUpdateSubrubro = async () => {
    const rubros = await getRubros(); // Espera a que se resuelva la promesa
    return <FormUpdateSubrubro id={id} rubros={rubros} />;
  };

  return (
    <>      
      {renderFormUpdateSubrubro()}
    </>
  );
}