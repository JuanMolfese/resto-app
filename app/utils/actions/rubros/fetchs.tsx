import { unstable_noStore } from "next/cache";
import { connection } from "../../models/db";
import { Rubro } from "../../models/types/rubro";

export async function fetchRubros() {
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

export async function fetchRubro(id: number):Promise<Rubro>  {
  unstable_noStore();
  try {
    const result:any = await connection.query<Rubro>("SELECT * FROM Rubro WHERE id = ?", id);
    if(result.length === 0) {
      await connection.end();
      throw new Error(`No se encontró ningún rubro con el ID ${id}`);
    }
    const info:Rubro = result[0];
    await connection.end();
    const infoPlano = JSON.parse(JSON.stringify(info));
    return infoPlano;
    
   /*  return {
        id: result[0].id,
        nombre: result[0].nombre
      } */
   
  } catch (error) {
     return  Promise.reject(error);
  }
}