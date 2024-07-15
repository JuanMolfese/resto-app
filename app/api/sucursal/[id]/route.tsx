import { NextResponse } from "next/server";
import { connection } from "../../../utils/models/db";

import io from 'socket.io-client';
import { Sucursal } from "../../../utils/models/types/sucursal";
const socket = io('http://localhost:3000');

export async function GET(req: Request, { params } : { params: {id: number}}) {
  try {
    const id = params.id;
    const res = await connection.query<Sucursal>(`SELECT * FROM Sucursal WHERE id = ?`, [id]);
    const data = JSON.stringify(res);
    const suc = JSON.parse(data);
    return NextResponse.json(suc[0]);
  } catch (err) {
    console.error(err);
    return NextResponse.json({status: 500});
  }
}

export async function PUT(req: Request, { params } : {params: {id: number}}) {
  try {
    const id = params.id;
    const status = await req.json();
    const res = await connection.query(`UPDATE Sucursal SET status_sucursal_id = ? WHERE id = ?`, [status, id]);
    socket.emit('updateSucursal', 'Sucursal Actualizada');
    await connection.end();
    return NextResponse.json({status: 200});   
  } catch (error) {
    console.log(error);
    return NextResponse.json({status: 500});
  }
}