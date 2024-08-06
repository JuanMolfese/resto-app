import { connectdb } from "../../models/db";
import { Producto, ProductoDetail } from "../../models/types/producto";
import { unstable_noStore as noStore } from 'next/cache';

export async function fetchProducts() {
  noStore();
  let connection;
  try {
    connection = await connectdb.getConnection();
    const [result] = await connection.execute("SELECT * FROM Producto");
    return result;
  } catch (error) {
    console.log(error);
  } finally {
    if (connection) {
      await connection.release();
    }
  }
}

export async function fetchProductsSucursal(sucursal_id: number) 
{
  noStore();
  let connection;
  try {
    connection = await connectdb.getConnection();
    const [products] = await connection.execute(
      `SELECT 
        p.id, 
        p.nombre, 
        p.descripcion, 
        p.image,
        sp.stock,
        sp.stock_minimo, 
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
   
    return products;
  } catch (error) {
    console.log(error);
  } finally {
    if (connection) {
      await connection.release();
    }
  }

}


export async function fetchProductsOutofStock(sucursal_id: number) {
  noStore();
  let connection;
  try {
    connection = await connectdb.getConnection();
    const [products] = await connection.execute(
      `SELECT 
        p.id, 
        p.nombre, 
        p.descripcion,
        p.image, 
        sp.stock, 
        sp.stock_minimo,
        sp.precio, 
        s.id as "subrubro_id", 
        s.nombre as "subrubro_nombre", 
        r.id as "rubro_id", 
        r.nombre as "rubro_nombre" 
      FROM Producto p 
        JOIN Sucursal_Productos sp on sp.producto_id = p.id 
        JOIN Subrubro s on s.id = p.subrubro_id 
        JOIN Rubro r on r.id = s.rubro_id 
      WHERE sp.stock < sp.stock_minimo and sp.sucursal_id = ?`
      , [sucursal_id]
    );

    return products;
  } catch (error) {
    console.log(error);
  } finally {
    if (connection) {
      await connection.release();
    }
  }
  
}
