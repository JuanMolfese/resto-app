"use server"

import { connection } from "../../models/db";

export default async function createSubrubro(formData: FormData) {
  try {
    const rawFormData = {      
      rubro_id: formData.get("rubroId"),      
      nombre: formData.get("name"),
      
    };
    //Aqui hacer verificaciones antes de insertar en BBDD
    await connection.query('INSERT INTO Subrubro (rubro_id, nombre) VALUES (?, ?)', [rawFormData.rubro_id, rawFormData.nombre])    
    return ("OK")
  }
  catch (error) {
    console.log(error);
  }
}