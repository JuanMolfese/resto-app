"use server"

import { connection } from "../../models/db";

export default async function createRubro(formData: FormData) {
  try {
    const rawFormData = {            
      nombre: formData.get("name"),      
    };
    //Aqui hacer verificaciones antes de insertar en BBDD
    const resultRubro = await connection.execute<any>('INSERT INTO Rubro (nombre) VALUES (?)', [rawFormData.nombre])      
        
    if (!resultRubro.affectedRows || resultRubro.affectedRows == 0){
      return{
        success: false,
        message: "Error al crear el Rubro",
        status: 404,
      }
    }   
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
  }finally{
    await connection.end(); // Cierra la conexión a la base de datos
  }
}