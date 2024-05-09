import { NextResponse } from "next/server";
import { connection } from "../../utils/models/db";
import { ProductoDetail } from "../../utils/models/types/producto";

export async function GET() {
  try {  
    const result = await connection.query<ProductoDetail[]>(
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
      , [1]);
    await connection.end();
    const products = result.map((product) => {
      return {
        id: product.id,
        nombre: product.nombre,
        descripcion: product.descripcion,
        image: product.image,
        stock: product.stock,
        stock_minimo: product.stock_minimo,
        precio: product.precio,
        subrubro_id: product.subrubro_id,
        subrubro_nombre: product.subrubro_nombre,
        rubro_id: product.rubro_id,
        rubro_nombre: product.rubro_nombre,
      };
    });
    return NextResponse.json(products);
  } catch (error) {
    return { status: 500, error: error };
  }
}

export async function POST(body: any) {
  try {
    const res = await connection.query('INSERT INTO Producto SET ?', body);
    await connection.end();
    return { status: 200, data: res };
  } catch (error) {
    return { status: 500, error: error };
  }
}

export async function PUT(id: number, body: any) {
  try {
    const res = await connection.query('UPDATE Producto SET ? WHERE id = ?', [body, id]);
    await connection.end();
    return { status: 200, data: res };
  } catch (error) {
    return { status: 500, error: error };
  }
}

export async function DELETE(id: number) {
  try {
    const res = await connection.query('DELETE FROM Producto WHERE id = ?', id);
    await connection.end();
    return { status: 200, data: res };
  } catch (error) {
    return { status: 500, error: error };
  }
}