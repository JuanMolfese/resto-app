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
    return NextResponse.json({ status: 500, error: error });
  }
}

/* export async function POST(req: Request) {
  try {
    const body = await req.json();
    const res = await connection.query('INSERT INTO Producto SET ?', body);
    await connection.end();
    return NextResponse.json({ status: 200, data: res });
  } catch (error) {
    return NextResponse.json({ status: 500, error: error });
  }
}
 */

import { v2 as cloudinary } from 'cloudinary';
import path from "path";
import { writeFile } from "fs/promises";


cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(req: Request) {
  try {
    
    const data = await req.formData();
    const nombre = data.get('name');
    const subrubro_id = data.get('subrubroId');
    const image = data.get('image');

    try {
      let secure_url = null;
      if(image && image instanceof File) {    
        const bytes = await image.arrayBuffer();
        const buffer = Buffer.from(bytes);
        const filePath = path.join(process.cwd(), 'public', image.name)    
        await writeFile(filePath, buffer)      
        const result = await cloudinary.uploader.upload(filePath);    
        if (result) secure_url = result.secure_url
        console.log(secure_url);
      }
      // Guarda la información del producto en la base de datos
      try {
        
        await connection.query("INSERT INTO producto (nombre, subrubro_id, image) VALUES (?, ?, ?)", 
        [nombre, subrubro_id, secure_url]);
        return NextResponse.json({ message: 'Producto agregado con éxito', status: 200 });
      } catch (dbError) {
        return NextResponse.json({ message: 'Error al agregar producto', status: 500 });
      }
    } catch (uploadError) {
      return NextResponse.json({ message: 'Error al subir la imagen a cloudinary', status: 500 });
    }
  } catch (error) {
    return NextResponse.json({ message: 'Error al agregar producto', status: 500 });
  }
}
