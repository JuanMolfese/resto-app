import { NextResponse } from "next/server";
import { connectdb } from "../../../utils/models/db";


export async function DELETE(request: Request, { params }: { params: { id: number } }) {
  let connection;
  try {
    const { id } = params;
    connection = await connectdb.getConnection();
    const [res] = await connection.execute("DELETE FROM Estado_Pedido WHERE id = ?", [id]);
    return NextResponse.json(res, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  } finally{
    if (connection) connection.release();
  }
}
