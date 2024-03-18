"use server"

import { connection } from "../../models/db";

export default async function createSubrubro(formData: FormData) {
  try {
    const rawFormData = {      
      rubro_id: formData.get("rubroId"),      
      nombre: formData.get("name"),
      
    };
    //Aqui hacer verificaciones antes de insertar en BBDD
    const resultSubRubro = await connection.query<any>('INSERT INTO Subrubro (rubro_id, nombre) VALUES (?, ?)', [rawFormData.rubro_id, rawFormData.nombre])    
    await connection.end(); // Cierra la conexión a la base de datos
    
    if (!resultSubRubro.affectedRows){
      return{
        success: false,
        message: "Error al crear el Rubro",
        status: 404,
      }
    }
    //Si esta todo OK
    return {
      success: true,
      message: "Subrubro creado",
      status: 200,
    }

  }
  catch (error) {
    return{
      success: false,
      message: "Error al crear el subrubro",
      status: 404,
    };
  }
}