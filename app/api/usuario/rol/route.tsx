import { NextResponse } from "next/server";
import { connection } from "../../../utils/models/db";
import { Rol } from "../../../utils/models/types/rol";

export async function GET() {
  try {
    const res = await connection.query<Rol>('SELECT * FROM Rol');
    await connection.end();
    return NextResponse.json({ status: 200, data: res });
  } catch (error) {
    return NextResponse.json({ status: 500, error: error });
  } finally {
    await connection.end();
  }
}