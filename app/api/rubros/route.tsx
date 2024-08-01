import { NextResponse } from "next/server";
import { connection } from "../../utils/models/db";
import { Rubro } from "../../utils/models/types/rubro";

export async function GET() {
  
  try {
    const result = await connection.query<Rubro[]>("SELECT * FROM Rubro");    
    const rubros = result.map((rubro) => {
      return {
        id: rubro.id,
        nombre: rubro.nombre,
      };
    })
    return NextResponse.json(rubros, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  } finally{
    await connection.end(); // Cierra la conexión a la base de datos
  }
  
}