"use server"

import { connection } from "../../models/db";

export default async function createRubro(formData: FormData) {
  try {
    const rawFormData = {            
      nombre: formData.get("name"),      
    };
    //Aqui hacer verificaciones antes de insertar en BBDD
    await connection.query('INSERT INTO Rubro (nombre) VALUES (?)', [rawFormData.nombre])      
    return ("OK")
  }
  catch (error) {
    console.log(error);
  }
}