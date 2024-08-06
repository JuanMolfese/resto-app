import { unstable_noStore } from "next/cache";
import { connectdb } from "../../models/db";
import { Rubro } from "../../models/types/rubro";

export async function fetchRubros() {
  unstable_noStore();
  let connection;
  try {
    connection = await connectdb.getConnection();
    const [rubros] = await connection.execute("SELECT * FROM Rubro");    
    return rubros;
  } catch (error) {
    console.log(error);
  }finally{
    if (connection) {
      await connection.release();
    }
  }
}

export async function fetchRubro(id: number):Promise<Rubro>  {
  unstable_noStore();
  let connection;
  try {
    connection = await connectdb.getConnection();
    const [result] = await connection.execute("SELECT * FROM Rubro WHERE id = ?", id);
    if(result) {      
      throw new Error(`No se encontró ningún rubro con el ID ${id}`);
    }
    return result;
  } catch (error) {
    return  Promise.reject(error);
  }finally{ 
    if (connection) {
      await connection.release();
    }
  }
}