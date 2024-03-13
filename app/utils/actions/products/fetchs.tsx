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
    await connection.end();
    const products = result.map((product) => {
      return {
        id: product.id,
        nombre: product.nombre,
        descripcion: product.descripcion,
        stock: product.stock,
        stock_minimo: product.stock_minimo,
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


export async function fetchProductsOutofStock(sucursal_id: number) {
  noStore();
  try {
    const result = await connection.query<ProductoDetail[]>(
      `SELECT 
        p.id, 
        p.nombre, 
        p.descripcion, 
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
    await connection.end();
    const products = result.map((product) => {
      return {
        id: product.id,
        nombre: product.nombre,
        descripcion: product.descripcion,
        stock: product.stock,
        stock_minimo: product.stock_minimo,
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
