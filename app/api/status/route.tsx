import { NextResponse } from "next/server";
import { connection } from "../../utils/models/db";
import { Estado_pedido } from "../../utils/models/types/estado_pedido";


export async function GET() {
  
  try {
    const result = await connection.execute<Estado_pedido[]>("SELECT * FROM Estado_Pedido");    
    const estados = result.map((estados) => {
      return {
        id: estados.id,
        descripcion: estados.descripcion,
        orden: estados.orden
      };
    })
    return NextResponse.json(estados, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  } finally{
    await connection.end(); // Cierra la conexión a la base de datos
  }
  
}