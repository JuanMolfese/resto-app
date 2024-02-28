'use server';

import { revalidatePath } from "next/cache";
import { connection } from "../../models/db";
import { ProductoDetail } from "../../models/types/producto";


export default async function updateProduct(id: number, formData: FormData) {
  try {
    const rawFormData = {
      nombre: formData.get("name"),
      id: formData.get("productId"),
      subrubroId: formData.get("subrubroId"),
      precio: formData.get("precio"),
      stock: formData.get("stock"),
    };
    
    //const result = await connection.query<Producto>("UPDATE Producto SET nombre = ? WHERE id = ?", [rawFormData.nombre, rawFormData.id]);
    const result = await connection.query<ProductoDetail>(`
      UPDATE Producto p JOIN Sucursal_Productos sp on sp.producto_id = p.id
      SET 
        p.nombre = ?,
        p.subrubro_id = ?,
        sp.precio = ?,
        sp.stock = ?
      WHERE id = ?`, 
      [rawFormData.nombre, rawFormData.subrubroId, rawFormData.precio, rawFormData.stock, rawFormData.id]
    );
    await connection.end();
    return { 
      success: true,
      message: 'Product Updated.' 
    };
  }  catch (error) {
    return { 
      success: false,
      message: 'Database Error: Failed to Update Product.' 
    };
  }
}