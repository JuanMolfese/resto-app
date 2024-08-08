import { NextResponse } from "next/server";
import { connectdb } from "../../utils/models/db";

export async function GET() {
  let connection;
  try {
    connection = await connectdb.getConnection();
    const [estados] = await connection.execute("SELECT * FROM Estado_Pedido");    
    return NextResponse.json(estados, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  } finally{
    if (connection) {
      connection.release();
    }
  }
  
}

export async function POST(request: Request) {
  let connection;
  try {
    connection = await connectdb.getConnection();
    const data = await request.formData();
    const nombre = data.get("name");
    const orden = data.get("order");
    const [estado] = await connection.execute("INSERT INTO Estado_Pedido (descripcion, orden) VALUES (?, ?)", [nombre, orden]);
    return NextResponse.json({estado, status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  } finally{
    if (connection) {
      connection.release();
    }
  }
}