import { NextResponse } from "next/server";
import { connectdb } from "../../utils/models/db";
<<<<<<< HEAD
=======
import { Subrubro } from "../../utils/models/types/subrubro";
>>>>>>> 56e274d842256ef013d9510c9766fbd4c69445ea

export async function GET() {
  let connection;
  try {
    connection = await connectdb.getConnection();
<<<<<<< HEAD
    const [subrubros] = await connection.execute("SELECT * FROM Subrubro");    

    return NextResponse.json(subrubros, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  } finally{
    if (connection) connection.release();
=======
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
>>>>>>> 56e274d842256ef013d9510c9766fbd4c69445ea
  }
  
}