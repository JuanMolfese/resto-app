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