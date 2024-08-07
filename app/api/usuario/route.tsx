import { NextResponse } from "next/server";
import { connectdb } from "../../utils/models/db";

export async function GET(request: Request) {
  let connection;
  try {
    connection = await connectdb.getConnection();
    const [users] = await connection.execute('SELECT * FROM Usuario');
    return NextResponse.json(users, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: 'Error connecting to database' }, { status: 500 });
  } finally {
    if (connection) {
      connection.release();
    }
  }
}