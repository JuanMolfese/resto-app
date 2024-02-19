import { connection } from "../../models/db";
import { Producto } from "../../models/types/producto";
import { unstable_noStore as noStore } from 'next/cache';

export async function fetchProducts() {
  noStore();
  try {
    const result = await connection.query<Producto[]>("SELECT * FROM Producto");
    await connection.end();
    const products = result.map((product) => {
      return {
        id: product.id,
        nombre: product.nombre,
        subrubro_id: product.subrubro_id,
      };
    });
    return products;
  } catch (error) {
    console.log(error);
  }
}

/* 
VAN EN ARCHIVO A PARTE, TE LO DEJO POR SI SEGUIS CON PRODUCTO Y TE SIRVE

  export async function updateProduct(product: Producto) {
  noStore();
  try {
    const result = await connection.query<Producto[]>("UPDATE Producto SET nombre=?, subrubro=? WHERE id=?",[product.nombre,product.subrubro_id, product.id]);
    await connection.end();
    return result;
  } catch (error) {
    console.log(error);
  }
}

export async function deleteProduct(id: number) {
  noStore();
  try {
    const result = await connection.query<Producto[]>("DELETE FROM Producto WHERE  id=?", [id]);
    if (!result[0]) throw new Error('No se ha podido eliminar el producto');
    else return result;
  } catch (error) {
    console.log(error);
    throw error;
  } finally{
    await connection.end();
  }
} */
