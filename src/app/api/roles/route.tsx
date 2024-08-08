import { NextResponse } from "next/server";
import { connectdb } from "../../utils/models/db";

export async function GET() {
  let connection;
  try {
    connection = await connectdb.getConnection();
    const [roles] = await connection.execute("SELECT * FROM Rol");
    return NextResponse.json(roles, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: 'Error connecting to database' }, { status: 500 });
  } finally {
    if (connection) {
      connection.release();
    }
  }
}