import { NextResponse } from "next/server";
import { connectdb } from "../../../../utils/models/db";

export async function GET(req: Request, { params } : {params: {email: string}}) {
  let connection;
  try {
    connection = await connectdb.getConnection();
    const email = params.email;
    const [res] = await connection.execute(`SELECT u.*, r.descripcion FROM Usuario u LEFT JOIN Rol r ON u.rol_id = r.id WHERE u.email = ?`, [email]);
    return NextResponse.json({data: res, status: 200});
  } catch (error) {
    return NextResponse.json({ error: error },{ status: 500 });
  } finally {
    if (connection) {
      connection.release();
    }
  }
}