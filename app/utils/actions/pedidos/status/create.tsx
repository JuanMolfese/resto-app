"use server"
import { connectdb } from "../../../models/db";

export default async function createState(formData: FormData){
  let connection;
  try {
    const rawFormData = {
      descripcion: formData.get("name"),
      orden: formData.get("order"),
    };
    connection = await connectdb.getConnection();
    const resultProduct = await connection.execute("INSERT INTO Estado_Pedido (descripcion, orden) VALUES (?, ?)", [rawFormData.descripcion, rawFormData.orden]);
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
  }finally{
    if (connection) {
      await connection.release();
    }
  }
}