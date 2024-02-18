"use server"

import { connection } from "../../models/db";

export default async function deleteSubrubro(id:number) {
  try {
   
    //Verificacion que no hay productos con el subrubro
    const verif_noProducts:any = await connection.query('SELECT * FROM Producto WHERE subrubro_id=?', [id]);
    
    if (verif_noProducts.length > 0) {
      return { error: `No se puede eliminar el subrubro ${id}, posee productos con el subrubro` };
    } else {
        const result:any = await connection.query('DELETE FROM Subrubro WHERE id = (?)', [id])
          if (result.affectedRows === 0) {
            return { error: `No se pudo eliminar el subrubro ${id}` };
          }
          connection.end(); // Cierra la conexión a la base de datos
          return {success: true};          
        }
    }
  catch (error) {
    console.error('Error al eliminar el registro:', error);
    throw error; 
  }
}

/* "use server"

FORMA USANDO FORMDATA

import { connection } from "../../models/db";

export default async function deleteSubrubro(formData: FormData) {
  try {
    const rawFormData = {      
      id: formData.get("id"),
    };
    //Verificacion que no hay productos con el subrubro
    const verif_noProducts:any = await connection.query('SELECT * FROM Producto WHERE subrubro_id=?', [rawFormData.id]);
    console.log(verif_noProducts);
    if (verif_noProducts.length > 0) {
      return { error: `No se puede eliminar el subrubro ${rawFormData.id}, posee productos con el subrubro` };
    } else {
        const result:any = await connection.query('DELETE FROM Subrubro WHERE id = (?)', [rawFormData.id])
          if (result.affectedRows === 0) {
            return { error: `No se pudo eliminar el subrubro ${rawFormData.id}` };
          }
          connection.end(); // Cierra la conexión a la base de datos
          return {success: true};          
        }
    }
  catch (error) {
    console.error('Error al eliminar el registro:', error);
    throw error; // Puedes relanzar el error para manejarlo en un nivel superior
  }
} */