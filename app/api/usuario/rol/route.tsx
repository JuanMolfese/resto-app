import { NextResponse } from "next/server";
import { connectdb } from "../../../utils/models/db";

export async function GET() {
  let connection;
  try {
    connection = await connectdb.getConnection();
    const res = await connection.execute('SELECT * FROM Rol');
    return NextResponse.json({ status: 200, data: res });
  } catch (error) {
    return NextResponse.json({ status: 500, error: error });
  } finally {
    if (connection) {
      connection.release();
    }
  }
}