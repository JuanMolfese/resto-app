import { connection } from "../../utils/models/db";

export async function POST(body: any) {
  try {
    const res = await connection.query('INSERT INTO Pedido SET ?', body);
    await connection.end();
    return { status: 200, data: res };
  } catch (error) {
    return { status: 500, error: error };
  }
}