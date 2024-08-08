import { NextResponse } from "next/server";
import { connectdb } from "../../../utils/models/db";

export async function GET(request: Request, { params }: { params: { id: number } }) {
  let connection;
  try {
    const { id } = params;
    connection = await connectdb.getConnection();
    const [res] = await connection.execute("SELECT * FROM Rubro WHERE id = ?", [id]);      
    const data = JSON.stringify(res);
    const rubro = JSON.parse(data);
    return NextResponse.json(rubro[0], { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  } finally{
    if (connection) connection.release();
  }
  
}

export async function PUT(req: Request, { params }: { params: { id: number } }) {
  let connection;
  try {
    const { id } = params;
    const { name } = await req.json();
    connection = await connectdb.getConnection();
    const [res] = await connection.execute("UPDATE Rubro SET nombre = ? WHERE id = ?", [name, id]);
    return NextResponse.json(res, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  } finally{
    if (connection) connection.release();
  }
}

export async function DELETE(request: Request, { params }: { params: { id: number } }) {
  let connection;
  try {
    const { id } = params;
    connection = await connectdb.getConnection();
    const [res] = await connection.execute("DELETE FROM Rubro WHERE id = ?", [id]);
    return NextResponse.json({res, status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  } finally{
    if (connection) connection.release();
  }
}

