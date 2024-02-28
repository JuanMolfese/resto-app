import { connection } from "../../models/db";
import { Producto, ProductoDetail } from "../../models/types/producto";
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

export async function fetchProductsSucursal(sucursal_id: number) 
{
  noStore();
  try {
    const result = await connection.query<ProductoDetail[]>(
      `SELECT 
        p.id, 
        p.nombre, 
        p.descripcion, 
        sp.stock, 
        sp.precio, 
        s.id as "subrubro_id", 
        s.nombre as "subrubro_nombre", 
        r.id as "rubro_id", 
        r.nombre as "rubro_nombre" 
      FROM Producto p 
        JOIN Sucursal_Productos sp on sp.producto_id = p.id 
        JOIN Subrubro s on s.id = p.subrubro_id 
        JOIN Rubro r on r.id = s.rubro_id 
      WHERE sp.sucursal_id = ?`
      , [sucursal_id]);
    await connection.end();
    const products = result.map((product) => {
      return {
        id: product.id,
        nombre: product.nombre,
        descripcion: product.descripcion,
        stock: product.stock,
        precio: product.precio,
        subrubro_id: product.subrubro_id,
        subrubro_nombre: product.subrubro_nombre,
        rubro_id: product.rubro_id,
        rubro_nombre: product.rubro_nombre,
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
