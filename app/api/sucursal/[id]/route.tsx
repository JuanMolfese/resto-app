import { NextResponse } from "next/server";
import { connectdb } from "../../../utils/models/db";

import io from 'socket.io-client';
const socket = io(process.env.NEXT_PUBLIC_URL || 'http://localhost:3000');

export async function GET(req: Request, { params } : { params: {id: number}}) {
  let connection;
  try {
    connection = await connectdb.getConnection();
    const id = params.id;
    const [res] = await connection.execute(`SELECT * FROM Sucursal WHERE id = ?`, [id]);
    const data = JSON.stringify(res);
    const suc = JSON.parse(data);
    return NextResponse.json(suc[0]);
  } catch (err) {
    console.error(err);
    return NextResponse.json({ status: 500 });
  } finally {
    if (connection) connection.release();
  } 
}

export async function PUT(req: Request, { params } : {params: {id: number}}) {
  let connection;
  try {
    connection = await connectdb.getConnection();
    const id = params.id;
    const status = await req.json();
    await connection.execute(`UPDATE Sucursal SET status_sucursal_id = ? WHERE id = ?`, [status, id]);
    socket.emit('updateSucursal', 'Sucursal Actualizada');
    return NextResponse.json({status: 200});   
  } catch (error) {
    console.log(error);
    return NextResponse.json({status: 500});
  } finally {
    if (connection) connection.release();
  }
}