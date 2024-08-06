"use server"

import { connectdb } from "../../models/db";

export default async function createSubrubro(formData: FormData) {
  let connection;
  try {
    connection = await connectdb.getConnection();
    const rawFormData = {      
      rubro_id: formData.get("rubroId"),      
      nombre: formData.get("name"),
      
    };
    //Aqui hacer verificaciones antes de insertar en BBDD
    const resultSubRubro = await connection.execute<any>('INSERT INTO Subrubro (rubro_id, nombre) VALUES (?, ?)', [rawFormData.rubro_id, rawFormData.nombre])    
    //Si esta todo OK
    return {
      success: true,
      message: "El Subrubro fue creado",
      status: 200,
    }

  }
  catch (error) {
    return{
      success: false,
      message: "Error al crear el subrubro",
      status: 404,
    };
  }finally{
    if (connection) {
      await connection.release();
    }
  }
}