import { connection } from "../../utils/models/db";
import { Producto } from "../../utils/models/types/producto";

export async function GET() {
  try {
    const res = await connection.query<Producto>('SELECT * FROM Producto');
    await connection.end();
    return { status: 200, data: res };
  } catch (error) {
    return { status: 500, error: error };
  }
}