import { connection } from "../../../utils/models/db";
import { Rol } from "../../../utils/models/types/rol";

export async function GET() {
  try {
    const res = await connection.query<Rol>('SELECT * FROM Rol');
    await connection.end();
    return { status: 200, data: res };
  } catch (error) {
    return { status: 500, error: error };
  }
}