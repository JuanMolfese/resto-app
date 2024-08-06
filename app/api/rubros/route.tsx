import { NextResponse } from "next/server";
import { connectdb } from "../../utils/models/db";
<<<<<<< HEAD

export async function GET() {
  let connection;
  try {
    connection = await connectdb.getConnection();
    const [rubros] = await connection.execute("SELECT * FROM Rubro");    
   
=======
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
>>>>>>> 56e274d842256ef013d9510c9766fbd4c69445ea
    return NextResponse.json(rubros, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  } finally{
<<<<<<< HEAD
    if (connection) connection.release();
=======
    if (connection) {
      connection.release();
    }
>>>>>>> 56e274d842256ef013d9510c9766fbd4c69445ea
  }
  
}