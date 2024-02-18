"use server"

import { connection } from "../../models/db";

export default async function updateSubrubro(formData: FormData) {
  try {
    const rawFormData = {      
      rubro_id: formData.get("rubroId"),      
      nombre: formData.get("name"),
      id_subrubro: formData.get("id_subrubro"),
    };
    //Aqui hacer verificaciones antes de insertar en BBDD    
    const result:any = await connection.query('UPDATE Subrubro SET rubro_id = ?, nombre = ? WHERE id = ?', [rawFormData.rubro_id, rawFormData.nombre, rawFormData.id_subrubro] )
    if (result.affectedRows === 0) {
      throw new Error('No se ha actualizado ningún registro');
    }

    console.log('Registro actualizado correctamente');
    connection.end(); // Cierra la conexión a la base de datos
  }
 catch (error) {
  console.error('Error al actualizar el registro:', error);
  throw error; // Puedes relanzar el error para manejarlo en un nivel superior
}
}