import { NextResponse } from "next/server";
import { connectdb } from "../../utils/models/db";
import { Subrubro } from "../../utils/models/types/subrubro";

export async function GET() {
  let connection;
  try {
    connection = await connectdb.getConnection();
    const result = await connection.execute("SELECT * FROM Subrubro");    
    const rubros = result.map((subrubro: any) => {
      return {
        id: subrubro.id,
        nombre: subrubro.nombre,
        rubro_id: subrubro.rubro_id
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