"use server";
import { connectdb } from "../../../models/db";
import { Estado_pedido } from "../../../models/types/estado_pedido";

export default async function deleteStatus(id: Number) {
  let connection;
  try {
    connection = await connectdb.getConnection();
    const response = await connection.execute(`DELETE FROM Estado_Pedido WHERE id = ?`, id);    return {
      success: true,
      message: "Estado eliminado con exito"
    }
  } catch (e) {
    return { 
      success: false,
      message: "El estado no puede ser eliminado"
    }
  }finally{
    if (connection) {
      await connection.release();
    }
  }
}