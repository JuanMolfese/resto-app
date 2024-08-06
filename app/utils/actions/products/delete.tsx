'use server'

import { connectdb } from "../../models/db";
import { Producto, ProductoDetail } from "../../models/types/producto";
import { Sucursal_productos } from "../../models/types/sucursal_productos";

export default async function deleteProduct(id: number){
  let connection;
  try {
    connection = await connectdb.getConnection();
    //const result = await connection.execute<Producto>("DELETE FROM Producto WHERE id = ?", [id]);
    const [resSP] = await connection.execute<any>(`
        DELETE FROM Sucursal_Productos WHERE producto_id = ?`,
        [id]
      );
    if (resSP.producto_id === id) {
      const resP = await connection.execute(`
        DELETE FROM Producto WHERE id = ?`,[id]
      );
    }
    return { 
      success: true,
      message: 'Product Deleted.' 
    };
  }  catch (error) {
    console.log(error);
    return { 
      success: false,
      message: 'Database Error: Failed to Delete Product.' 
    };
  }finally{
    if (connection) {
      await connection.release();
    }
  }
}