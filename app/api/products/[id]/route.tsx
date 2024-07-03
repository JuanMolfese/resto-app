import { NextResponse } from "next/server";
import { connection } from "../../../utils/models/db";
import { Producto } from "../../../utils/models/types/producto";

import io from 'socket.io-client';
const socket = io('http://localhost:3000');

export async function GET(req: Request, { params } : {params: {id: number}}) {
  try {
    const id = params.id;
    const res = await connection.query<Producto[]>(`SELECT * FROM producto WHERE id = ?`, [id]);
    await connection.end();
    return NextResponse.json({data: res[0], status: 200});   
  } catch (error) {
    return NextResponse.json({data: error, status: 500});
  }
}

export async function PUT(req: Request, { params } : {params: {id: number}}) {
  try {
    const id = params.id;
    const sucId = 1;
    const body = await req.json();
    const data = body.body;
    const resSucprod = await connection.query(`UPDATE sucursal_productos SET precio = ?, stock = ?, stock_minimo = ? where producto_id = ? AND sucursal_id = ?`, [data.precio, data.stock, data.stock_minimo, id, sucId]);
    const res = await connection.query(`UPDATE producto SET nombre = ?, descripcion = ?, subrubro_id = ?, image = ? WHERE id = ?`, [data.nombre, data.descripcion, data.subrubro_id, data.image, id]);
    socket.emit('updateProducto', 'Producto Actualizado');
    await connection.end();
    return NextResponse.json({status: 200});   
  } catch (error) {
    return NextResponse.json({status: 500});
  }
}

export async function DELETE(req: Request, { params } : {params: {id: number}}) {
  try {
    
    const id = params.id;
    const res = await connection.query(`DELETE FROM producto WHERE id = ?`, [id]);
    socket.emit('updateProducto', 'Producto Eliminado');
    await connection.end();
    return NextResponse.json({status: 200});   
  } catch (error) {
    return NextResponse.json({status: 500});
  }
}