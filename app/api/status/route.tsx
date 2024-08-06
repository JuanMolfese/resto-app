import { NextResponse } from "next/server";
import { connectdb } from "../../utils/models/db";
import { Estado_pedido } from "../../utils/models/types/estado_pedido";


export async function GET() {
  let connection;
  try {
    connection = await connectdb.getConnection();
    const result = await connection.execute("SELECT * FROM Estado_Pedido");    
    const estados = result.map((estados: any) => {
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
    if (connection) {
      connection.release();
    }
  }
  
}