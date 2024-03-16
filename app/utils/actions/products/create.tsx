'use server';

import { redirect } from "next/navigation";
import { connection } from "../../models/db";
import { revalidatePath } from "next/cache";
import { Sucursal_productos } from "../../models/types/sucursal_productos";

export default async function createProduct(formData: FormData) {
  try {
    const rawFormData = {
      nombre: formData.get("name"),
      subrubro_id: formData.get("subrubroId"),
    };
        
    const resultProduct = await connection.query<any>("INSERT INTO Producto (nombre, subrubro_id) VALUES (?, ?)", [rawFormData.nombre, rawFormData.subrubro_id]);
    if (!resultProduct.affectedRows) {
      throw new Error("Error al crear el producto");
    }
    const productId = resultProduct.insertId;
    const resultSucProduct = await connection.query<any>("INSERT INTO Sucursal_Productos (producto_id, sucursal_id) VALUES (?, ?)", [productId, 1]);
    await connection.end();
    if (!resultSucProduct.affectedRows) {
      throw new Error("Error al crear el producto en la sucursal");
    }
    return {
      success: true,
      message: "Producto creado",
    }
  }
  catch (error) {
    return {
      success: false,
      message: "Error al crear el producto",
    }
  }
}