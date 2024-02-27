"use server"

import { connection } from "../../models/db";

export default async function updateRubro(formData: FormData) {
  try {
    const rawFormData = {      
      id: formData.get("id"),      
      nombre: formData.get("name"),
      
    };
    console.log(rawFormData);
    //Aqui hacer verificaciones antes de insertar en BBDD    
    const result:any = await connection.query('UPDATE Rubro SET nombre = ? WHERE id = ?', [rawFormData.nombre, rawFormData.id] )
    if (result.affectedRows === 0) {
      throw new Error('No se ha actualizado ningún registro');
    }
    console.log('Registro actualizado correctamente');
    connection.end(); // Cierra la conexión a la base de datos
    return { success: true, message: 'Registro actualizado correctamente' };
  }
 catch (error) {
  console.error('Error al actualizar el registro: ', error);
  throw error; // Puedes relanzar el error para manejarlo en un nivel superior
}
}


/* return await Promise.resolve({ data: rawFormData });  */