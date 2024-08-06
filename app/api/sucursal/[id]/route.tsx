import { NextResponse } from "next/server";
import { connectdb } from "../../../utils/models/db";

import io from 'socket.io-client';
import { Sucursal } from "../../../utils/models/types/sucursal";
const socket = io('http://localhost:3000');

export async function GET(req: Request, { params } : { params: {id: number}}) {
  let connection;
  try {
    connection = await connectdb.getConnection();
    const id = params.id;
<<<<<<< HEAD
    const [res] = await connection.execute(`SELECT * FROM Sucursal WHERE id = ?`, [id]);
    const data = JSON.stringify(res);
    const suc = JSON.parse(data);
    return NextResponse.json(suc[0]);
=======
    const [sucursal] = await connection.execute(`SELECT * FROM Sucursal WHERE id = ?`, [id]);
    
    return NextResponse.json(sucursal, {status: 200});

>>>>>>> 56e274d842256ef013d9510c9766fbd4c69445ea
  } catch (err) {
    console.error(err);
    return NextResponse.json({ status: 500 });
  } finally {
<<<<<<< HEAD
    if (connection) connection.release();
=======
    if (connection) {
      connection.release();
    }
>>>>>>> 56e274d842256ef013d9510c9766fbd4c69445ea
  } 
}

export async function PUT(req: Request, { params } : {params: {id: number}}) {
  let connection;
  try {
    connection = await connectdb.getConnection();
    const id = params.id;
    const status = await req.json();
    const res = await connection.execute(`UPDATE Sucursal SET status_sucursal_id = ? WHERE id = ?`, [status, id]);
    socket.emit('updateSucursal', 'Sucursal Actualizada');
    return NextResponse.json({status: 200});   
  } catch (error) {
    console.log(error);
    return NextResponse.json({status: 500});
  } finally {
<<<<<<< HEAD
    if (connection) connection.release();
=======
    if (connection) {
      connection.release();
    }
>>>>>>> 56e274d842256ef013d9510c9766fbd4c69445ea
  }
}