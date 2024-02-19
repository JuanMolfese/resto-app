'use server';

import { revalidatePath } from "next/cache";
import { connection } from "../../models/db";
import { Producto } from "../../models/types/producto";
import { redirect } from "next/navigation";

export default async function updateProduct(id: number, formData: FormData) {
  try {
    const rawFormData = {
      nombre: formData.get("name"),
      id: formData.get("productId"),
    };
    
    const result = await connection.query<Producto>("UPDATE Producto SET nombre = ? WHERE id = ?", [rawFormData.nombre, rawFormData.id]);
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