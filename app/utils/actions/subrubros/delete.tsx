"use server"

import { connection } from "../../models/db";

export default async function deleteSubrubro(id: number) {
  try {
    // Verifica si hay productos asociados al subrubro
    const verif_noProducts:any = await connection.query('SELECT * FROM Producto WHERE subrubro_id=?', [id]);
    if (verif_noProducts.length === 0) { // Verifica si no hay productos asociados
      const result:any= await connection.query('DELETE FROM Subrubro WHERE id = (?)', [id])      
      if (result.affectedRows === 1) {
        return {
          success: true,
          status: 200,
          message: "El subrubro fue eliminado",
        };
      } else {
        return {
          success: false,
          status: 409,
          message: "No se pudo eliminar, porque ya no existe",
        }
      }
    } else {
      return {
        success: false,
        status: 409,
        message: "No se puede eliminar el subrubro, posee productos asociados",
      };
    }
  } catch (error) {
    console.error("Error al eliminar el subrubro:", error);
    return {
      success: false,
      status: 500,
      message: "Error interno del servidor",
    };
  } finally {
    await connection.end(); // Cierra la conexión a la base de datos
  }
}