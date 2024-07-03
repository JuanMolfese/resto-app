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

export async function PUT(req: Request, { params, body } : {params: {id: number}, body: Producto}) {
  try {
    const id = params.id;
    const res = await connection.query(`UPDATE producto SET ? WHERE id = ?`, [body, id]);
    await connection.end();
    return NextResponse.json({data: "ok"}, {status: 200});   
  } catch (error) {
    return NextResponse.json({data: error}, {status: 500});
  }
}

export async function DELETE(req: Request, { params } : {params: {id: number}}) {
  try {
    
    const id = params.id;
    const res = await connection.query(`DELETE FROM producto WHERE id = ?`, [id]);
    socket.emit('deleteProduct', 'Producto Eliminado');
    await connection.end();
    return NextResponse.json({status: 200});   
  } catch (error) {
    return NextResponse.json({status: 500});
  }
}