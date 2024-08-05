import { NextResponse } from "next/server";
import { connection } from "../../../utils/models/db";

export async function PUT(req: Request, { params } : {params: {id: String}}) {
  try {
    const id = params.id;
    const sucId = 1;
    const body = await req.json();
    const new_estado = body
    const res = await connection.execute(`UPDATE Pedido set estado_pedido_id = ? WHERE id = ?`, [new_estado, id])
    await connection.end();
    return NextResponse.json({status: 200});   
  } catch (error) {
    return NextResponse.json({status: 500});
  } finally {
    await connection.end();
  }
}

export async function GET(req: Request, { params } : {params: {id: String}}) {
  try {
    const id = params.id;
    const res = await connection.execute(
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
    await connection.end();
    const data = JSON.parse(JSON.stringify(res));
    return NextResponse.json({pedido: data}, {status: 200});
  } catch (error) {
    return NextResponse.json({status: 500});
  } finally {
    await connection.end();
  }
}