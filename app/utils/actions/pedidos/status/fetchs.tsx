import { connection } from "../../../models/db";
import { Estado_pedido } from "../../../models/types/estado_pedido";

export async function fetchStatus() {
  try {
    const result = await connection.query<Estado_pedido[]>("SELECT * FROM Estado_Pedido ORDER BY orden");
    const status = result.map((status) => {
      return {
        id: status.id,
        descripcion: status.descripcion,
        orden: status.orden,
      };
    });
    return status;
  } catch (error) {
    console.error(error);
  } finally {
    await connection.end(); // Cierra la conexión a la base de datos
  }
}