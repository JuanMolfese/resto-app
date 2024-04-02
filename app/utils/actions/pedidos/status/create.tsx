"use server"
import { connection } from "../../../models/db";

export default async function createState(formData: FormData){
  try {
    const rawFormData = {
      descripcion: formData.get("name"),
      orden: formData.get("order"),
    };
        
    const resultProduct = await connection.query<any>("INSERT INTO Estado_Pedido (descripcion, orden) VALUES (?, ?)", [rawFormData.descripcion, rawFormData.orden]);
    if (!resultProduct.affectedRows) {
      throw new Error("Error al crear el Estado");
    }
    const productId = resultProduct.insertId;
    await connection.end();
    return {
      success: true,
      message: "Estado creado",
    }
  }
  catch (error) {
    return {
      success: false,
      message: "Error al crear el estado, orden o descripcion repetidos",
    }
  }
  
}