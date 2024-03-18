"use server"

import { connection } from "../../models/db";

export default async function createRubro(formData: FormData) {
  try {
    const rawFormData = {            
      nombre: formData.get("name"),      
    };
    //Aqui hacer verificaciones antes de insertar en BBDD
    const resultRubro = await connection.query<any>('INSERT INTO Rubro (nombre) VALUES (?)', [rawFormData.nombre])      
    await connection.end();
    
    if (!resultRubro.affectedRows){
      return{
        success: false,
        message: "Error al crear el Rubro",
        status: 404,
      }
    }
    await connection.end();
    return{
      success: true,
      messagge: "El Rubro fue creado",
      status: 200,
    }
  }
  catch (error) {
    return{
      success: false,
      message: "Error al crear el Rubro",
      status: 404,
    }
  }
}