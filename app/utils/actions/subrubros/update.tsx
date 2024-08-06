"use server"

import { connectdb } from "../../models/db";

export default async function updateSubrubro(formData: FormData) {
  let connection;
  try {
    connection = await connectdb.getConnection();
      const rawFormData = {      
        rubro_id: formData.get("rubroId"),      
        nombre: formData.get("name"),
        id_subrubro: formData.get("id_subrubro"),
      };
      
      //Aqui hacer verificaciones antes de insertar en BBDD    
      const result:any = await connection.execute('UPDATE Subrubro SET rubro_id = ?, nombre = ? WHERE id = ?', [rawFormData.rubro_id, rawFormData.nombre, rawFormData.id_subrubro] )
      if (result.affectedRows === 1) {
        return {
          success: true,
          status: 200,
          message: "El subrubro fue editado",
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
    if (connection) {
      await connection.release();
    }
  }
}
