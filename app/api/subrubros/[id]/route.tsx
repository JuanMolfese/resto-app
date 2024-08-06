import { NextResponse } from "next/server";
import { connectdb } from "../../../utils/models/db";

export async function GET(req: Request) {
  let connection;
  try {
    const id = await req.json();
    connection = await connectdb.getConnection();
    const [res] = await connection.execute("SELECT * FROM Subrubro WHERE id = ?", [id]);
    const data = JSON.stringify(res);
    const subrubro = JSON.parse(data);
    return NextResponse.json(subrubro[0]);

  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  } finally {
    if (connection) connection.end();
  }

}
