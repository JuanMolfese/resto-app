import { unstable_noStore } from "next/cache";
import { connection } from "../../models/db";
import { Rubro } from "../../models/types/rubro";

export async function fetchRubros() {
  unstable_noStore();
  try {
    const result = await connection.execute<Rubro[]>("SELECT * FROM Rubro");    
    const rubros = result.map((rubro) => {
      return {
        id: rubro.id,
        nombre: rubro.nombre,
      };
    })
    return rubros;
  } catch (error) {
    console.log(error);
  }finally{
    await connection.end(); // Cierra la conexión a la base de datos
  }
}

export async function fetchRubro(id: number):Promise<Rubro>  {
  unstable_noStore();
  try {
    const result:any = await connection.execute<Rubro>("SELECT * FROM Rubro WHERE id = ?", id);
    if(result.length === 0) {      
      throw new Error(`No se encontró ningún rubro con el ID ${id}`);
    }
    const info:Rubro = result[0];    
    const infoPlano = JSON.parse(JSON.stringify(info));
    return infoPlano;
  } catch (error) {
    return  Promise.reject(error);
  }finally{
    await connection.end(); // Cierra la conexión a la base de datos
  }
}