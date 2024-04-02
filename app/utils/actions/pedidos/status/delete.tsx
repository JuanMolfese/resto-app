"use server";
import { connection } from "../../../models/db";
import { Estado_pedido } from "../../../models/types/estado_pedido";

export default async function deleteStatus(id: Number) {
  try {
    const response = await connection.query<Estado_pedido>(`DELETE FROM Estado_Pedido WHERE id = ?`, id);
    connection.end();
    return {
      success: true,
      message: "Estado eliminado con exito"
    }
  } catch (e) {
    return { 
      success: false,
      message: "El estado no puede ser eliminado"
    }
  }
}