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
    return NextResponse.json(rubros);
  } catch (error) {
    console.log(error);
  }finally{
    await connection.end(); // Cierra la conexión a la base de datos
  }
  
}