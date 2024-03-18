"use server"

import { connection } from "../../models/db";

export default async function deleteRubro(id : number) {

  try {
      const result:any = await connection.query('DELETE FROM Rubro WHERE id = (?)', [id])
      if (result.affectedRows === 0) {
        return {
          success: false,
          status: 409,
          message: "No se pudo eliminar, quizas un subrubro lo tiene como rubro",
        }
      }
      return {
        success: true,
        status: 200,
        message: "El rubro fue eliminado",
      };      
  } catch (error) {
    console.error("Error al eliminar el rubro:", error);
    return {
      success: false,
      status: 500,
      message: "Error interno del servidor",
    };
  }finally {
    await connection.end(); // Cierra la conexión a la base de datos  
  }
}