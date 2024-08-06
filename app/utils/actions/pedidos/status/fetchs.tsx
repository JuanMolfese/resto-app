import { connectdb } from "../../../models/db";
import { Estado_pedido } from "../../../models/types/estado_pedido";

export async function fetchStatus() {
  let connection;
  try {
    connection = await connectdb.getConnection();
    const [status] = await connection.execute("SELECT * FROM Estado_Pedido ORDER BY orden");
    return status;
  } catch (error) {
    console.error(error);
  } finally {
    if (connection) {
      await connection.release();
    }
  }
}