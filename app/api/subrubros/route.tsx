import { NextResponse } from "next/server";
import { connectdb } from "../../utils/models/db";

export async function GET() {
  let connection;
  try {
    connection = await connectdb.getConnection();
    const [subrubros] = await connection.execute("SELECT * FROM Subrubro");    
    return NextResponse.json(subrubros, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  } finally{
    if (connection) connection.release();
  }
}

export async function POST(request: Request) {
  let connection;
  try {
    const data = await request.formData();
    connection = await connectdb.getConnection();
    const nombre = data.get("name");
    const rubro_id = data.get("rubroId");
    const [subrubro] = await connection.execute("INSERT INTO Subrubro (nombre, rubro_id) VALUES (?, ?)", [nombre, rubro_id]);
    return NextResponse.json(subrubro, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error, status: 500 });
  } finally{
    if (connection) connection.release();
  }
}



