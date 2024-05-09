import { NextResponse } from "next/server";
import { connection } from "../../../utils/models/db";
import { Producto } from "../../../utils/models/types/producto";

export async function GET(req: Request, { params } : {params: {id: number}}) {
  try {
    const id = params.id;
    const res = await connection.query<Producto[]>(`SELECT * FROM Producto WHERE id = ?`, [id]);
    await connection.end();
    return NextResponse.json({data: res[0], status: 200});   
  } catch (error) {
    return NextResponse.json({data: error, status: 500});
  }
}