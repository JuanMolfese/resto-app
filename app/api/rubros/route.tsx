import { NextResponse } from "next/server";
import { connectdb } from "../../utils/models/db";

export async function GET() {
  let connection;
  try {
    connection = await connectdb.getConnection();
    const [rubros] = await connection.execute("SELECT * FROM Rubro");    
   
    return NextResponse.json(rubros, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  } finally{
    if (connection) connection.release();
  }
  
}