import { unstable_noStore } from "next/cache";
import { connection } from "../../models/db";
import { Subrubro } from "../../models/types/subrubro";

export default async function fetchSubrubros() {
  unstable_noStore();
  try {
    const result = await connection.execute<Subrubro[]>("SELECT * FROM Subrubro");    
    const subrubros = result.map((subrubro) => {
      return {
        id: subrubro.id,
        nombre: subrubro.nombre,
        rubro_id: subrubro.rubro_id,
      };
    });
    return subrubros;
  } catch (error) {
    console.log(error);
  }finally{
    await connection.end(); // Cierra la conexión a la base de datos
  }
}

export async function fetchInfoSubRubro(id: number):Promise<Subrubro> {
  unstable_noStore();
  try {
    const result:any = await connection.execute<Subrubro>("SELECT * FROM Subrubro WHERE id = ?", id);    
    if (result.length === 0) {
      throw new Error(`No se encontró ningún subrubro con el ID ${id}`);
    }
    const info:Subrubro = result[0];       
    const infoPlano = JSON.parse(JSON.stringify(info));
    return infoPlano;
  } catch (error) {
    return Promise.reject(error);
  } finally {
    await connection.end(); // Cierra la conexión a la base de datos
  }
}