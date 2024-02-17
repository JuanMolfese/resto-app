"use server"

import { connection } from "../../models/db";

export default async function deleteRubro(formData: FormData) {
  try {
    const rawFormData = {      
      id: formData.get("id"),
    };
    //Aqui hacer verificaciones antes de insertar en BBDD
    await connection.query('DELETE FROM Rubro WHERE id = (?)', [rawFormData.id])
    return ("OK")
  }
  catch (error) {
    console.log(error);
  }
}