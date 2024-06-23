import { NextResponse } from "next/server";
import { connection } from "../../utils/models/db";

export async function GET() {
  try {
    const res = await connection.query(`
      SELECT
        p.id,
        p.fecha_emision,
        p.estado_pedido_id,
        e.descripcion as estado_pedido_descripcion,
        p.fecha_finalizacion,
        p.pago,
        p.modo_entrega_id,
        m.descripcion as modo_entrega_descripcion,
        p.mp_id,
        p.payer_first_name,
        p.payer_last_name,
        p.payer_email,
        p.payer_dni,
        p.payer_phone,
        p.payer_address
      FROM Pedido p 
        JOIN Estado_Pedido e on p.estado_pedido_id = e.id 
        JOIN Modo_Entrega m on p.modo_entrega_id = m.id
    `);
    await connection.end();
    return NextResponse.json(res);
  } catch (error) {
    return { status: 500, error: error };
  }
}

export async function POST(body: any) {
  try {
    const res = await connection.query('INSERT INTO Pedido SET ?', body);
    await connection.end();
    return { status: 200, data: res };
  } catch (error) {
    return { status: 500, error: error };
  }
}

