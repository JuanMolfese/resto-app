import { NextResponse } from "next/server";
import { connection } from "../../utils/models/db";
import { Estado_pedido } from "../../utils/models/types/estado_pedido";


export async function GET() {
  
  try {
    const result = await connection.query<Estado_pedido[]>("SELECT * FROM Estado_Pedido");    
    const estados = result.map((estados) => {
      return {
        id: estados.id,
        descripcion: estados.descripcion,
        orden: estados.orden
      };
    })
    return NextResponse.json(estados);
  } catch (error) {
    console.log(error);
  } finally{
    await connection.end(); // Cierra la conexión a la base de datos
  }
  
}