import { unstable_noStore } from "next/cache";
import { connectdb } from "../../models/db";
import { Subrubro } from "../../models/types/subrubro";

export default async function fetchSubrubros() {
  unstable_noStore();
  let connection;
  try {
    connection = await connectdb.getConnection();
    const [subrubros] = await connection.execute("SELECT * FROM Subrubro");    
    return subrubros;
  } catch (error) {
    console.log(error);
  }finally{ 
    if (connection) {
      await connection.release();
    }
  }
}

export async function fetchInfoSubRubro(id: number) {
  unstable_noStore();
  let connection;
  try {
    connection = await connectdb.getConnection();
    const [result] = await connection.execute("SELECT * FROM Subrubro WHERE id = ?", id);         
    return result;
  } catch (error) {
    return Promise.reject(error);
  } finally {
    if (connection) {
      await connection.release();
    }
  }
}