"use server"

import { connectdb } from "../../models/db";

export default async function createRubro(formData: FormData) {
  let connection;
  try {
    connection = await connectdb.getConnection();
    const rawFormData = {            
      nombre: formData.get("name"),      
    };
    //Aqui hacer verificaciones antes de insertar en BBDD
    const resultRubro = await connection.execute<any>('INSERT INTO Rubro (nombre) VALUES (?)', [rawFormData.nombre])      
        
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
    if (connection) {
      await connection.release();
    }
  }
}