import { NextResponse } from "next/server";
import { connectdb } from "../../../utils/models/db";

export async function PUT(req: Request, { params } : {params: {id: String}}) {
  let connection;
  try {
    connection = await connectdb.getConnection();
    const id = params.id;
    const sucId = 1;
    const body = await req.json();
    const new_estado = body
    const [res] = await connection.execute(`UPDATE Pedido set estado_pedido_id = ? WHERE id = ?`, [new_estado, id])
    return NextResponse.json({status: 200});   
  } catch (error) {
    return NextResponse.json({status: 500});
  } finally {
    if (connection) {
      connection.release();
    }
  }
}

export async function GET(req: Request, { params } : {params: {id: String}}) {
  let connection;
  try {
    connection = await connectdb.getConnection();
    const id = params.id;
    const [res] = await connection.execute(
      `SELECT
        pp.producto_id,
        pp.cantidad,
        pp.precio,
        p.nombre as producto,   
        s.nombre as subrubro
      FROM 
        Pedido_Productos pp JOIN Producto p ON p.id = pp.producto_id
        JOIN Subrubro s ON s.id = p.subrubro_id
      WHERE pp.pedido_id = ?
      `, [id]);
    const data = JSON.stringify(res);
    const pedido = JSON.parse(data);
    return NextResponse.json(pedido, {status: 200});
  } catch (error) {
    return NextResponse.json({status: 500});
  } finally {
    if (connection) {
      connection.release();
    }
  }
}