"use server"

import { connection } from "../../models/db";

export default async function updateRubro(formData: FormData) {
  try {
    const rawFormData = {      
      id: formData.get("id"),      
      nombre: formData.get("name"),
      
    };
    
    //Aqui hacer verificaciones antes de insertar en BBDD    
    const result:any = await connection.execute('UPDATE Rubro SET nombre = ? WHERE id = ?', [rawFormData.nombre, rawFormData.id] )
    if (result.affectedRows === 1) {
      return {
        success: true,
        status: 200,
        message: "El rubro fue editado",
      };
    } else {
      return {
        success: false,
        status: 409,
        message: "No se pudo editar, porque ya no existe",
      }     
    }
} catch (error) {
  console.error("Error al editar el subrubro:", error);
  return {
    success: false,
    status: 500,
    message: "Error interno del servidor",
  };
} finally {
  await connection.end(); // Cierra la conexión a la base de datos
}
}


/* return await Promise.resolve({ data: rawFormData });  */