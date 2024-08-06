import { NextResponse } from "next/server";
import { connectdb } from "../../utils/models/db";
import { Rubro } from "../../utils/models/types/rubro";

export async function GET() {
  
  let connection;
  try {
    connection = await connectdb.getConnection();
    const result = await connection.execute("SELECT * FROM Rubro");    
    const rubros = result.map((rubro: any) => {
      return {
        id: rubro.id,
        nombre: rubro.nombre,
      };
    })
    return NextResponse.json(rubros, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  } finally{
    if (connection) {
      connection.release();
    }
  }
  
}