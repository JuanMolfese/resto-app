"use server"

import { connection } from "../../models/db";

export default async function deleteRubro(id : number) {

  try{
    
    const verify_noSubrubros:any = await connection.query('SELECT * FROM Subrubro WHERE rubro_id=?', [id]);
    
    if(!verify_noSubrubros || verify_noSubrubros.length === 0){
      const result:any = await connection.query('DELETE FROM Rubro WHERE id = (?)', [id]) 
      
      if (result.affectedRows === 0) {
        return { error: `No se pudo eliminar el rubro ${id}` };
      }else{
        return {
          success: true,
          status: 200,
          message: "El rubro fue eliminado",
        };    
      }  
   }
  }
  catch (error) {
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