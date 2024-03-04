'use server'

import { connection } from "../../models/db";
import { ProductoDetail } from "../../models/types/producto";

export default async function deleteProduct(id: number){
  try {
    //const result = await connection.query<Producto>("DELETE FROM Producto WHERE id = ?", [id]);
    const result = await connection.query<ProductoDetail>(`
      DELETE p, sp
      FROM Producto p
      JOIN Sucursal_Productos sp ON sp.producto_id = p.id
      WHERE p.id = ?`, 
      [id]
    );
    await connection.end();
    return { 
      success: true,
      message: 'Product Deleted.' 
    };
  }  catch (error) {
    return { 
      success: false,
      message: 'Database Error: Failed to Delete Product.' 
    };
  }
}