import { NextResponse } from "next/server";
import { connectdb } from "../../utils/models/db";

export async function GET() {
  let connection;
  try {
    connection = await connectdb.getConnection();
    const [res] = await connection.execute(`
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
        p.payer_address,
        p.total
      FROM Pedido p 
        JOIN Estado_Pedido e on p.estado_pedido_id = e.id 
        JOIN Modo_Entrega m on p.modo_entrega_id = m.id
    `);
    return NextResponse.json(res, { status: 200 });
  } catch (error) {
    return NextResponse.json({ status: 500, error: error });
  } finally {
    if (connection) {
      connection.release();
    }
  }
}

export async function POST(body: any) {
  let connection;
  try {
    connection = await connectdb.getConnection();
    const res = await connection.execute('INSERT INTO Pedido SET ?', body);
    return NextResponse.json({ status: 200, data: res });
  } catch (error) {
    return NextResponse.json({ status: 500, error: error });
  } finally {
    if (connection) {
      connection.release();
    }
  }
}

