import { unstable_noStore } from "next/cache";
import { connection } from "../../models/db";
import { Rubro } from "../../models/types/rubro";

export default async function fetchRubros() {
  unstable_noStore();
  try {
    const result = await connection.query<Rubro[]>("SELECT * FROM Rubro");
    await connection.end();
    const rubros = result.map((rubro) => {
      return {
        id: rubro.id,
        nombre: rubro.nombre,
      };
    })
    return rubros;
  } catch (error) {
    console.log(error);
  }
}