"use server"

import { connection } from "../../models/db";

export default async function deleteRubro(id : number) {

  try {
    
    const verify_noSubrubros:any = await connection.query('SELECT * FROM Subrubro WHERE rubro_id=?', [id]);

    if(verify_noSubrubros==0){
      const result:any = await connection.query('DELETE FROM Rubro WHERE id = (?)', [id])
      if (result.affectedRows === 0) {
        return { error: `No se pudo eliminar el rubro ${id}` };
      }
        connection.end(); // Cierra la conexión a la base de datos
        return {success: true};  
    }else{
      return {error: `No se pudo eliminar el rubro ${id}, porque posee subrubros que tienen este rubro` }
    }
  }
  catch (error) {
    console.log(error);
    throw error; 
  }
}