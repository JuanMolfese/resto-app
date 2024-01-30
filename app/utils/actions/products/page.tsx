import { connection } from "../../models/db";
import { Producto } from "../../models/types/producto";
import { unstable_noStore as noStore } from 'next/cache';

export async function fetchProducts() {
  noStore();
  try {
    const result = await connection.query<Producto[]>("SELECT * FROM Producto");
    await connection.end();
    return result;
  } catch (error) {
    console.log(error);
  }
}
