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
import { promises as fs } from 'fs';


cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

function isFile(obj: any) {
  return obj instanceof Buffer || obj instanceof Uint8Array || obj instanceof ArrayBuffer;
}

export async function POST(req: Request) {
  try {
    
    const data = await req.formData();
    const nombre = data.get('name');
    const subrubro_id = data.get('subrubroId');
    const image = data.get('productImage');
    
    try {
      let imageUrl = null;
      if (image != null && image && typeof image === 'object' && 'name' in image && 'size' in image) {
        const bytes = await image.arrayBuffer();
        const buffer = Buffer.from(bytes);

        const tempDir = path.join(process.cwd(), 'public', 'uploads');
        await fs.mkdir(tempDir, { recursive: true });
        const filePath = path.join(tempDir, image.name);
        await fs.writeFile(filePath, buffer);

        const result = await cloudinary.uploader.upload(filePath, {
          folder: 'productos',
        });

        if (result) {
          imageUrl = result.secure_url;
        }

        await fs.unlink(filePath);
      }
      // Guarda la información del producto en la base de datos
      try {
        const resultProduct = await connection.query<any>("INSERT INTO Producto (nombre, subrubro_id, image) VALUES (?, ?, ?)", 
        [nombre, subrubro_id, imageUrl]);
        if (!resultProduct.affectedRows) {
          throw new Error("Error al crear el producto");
        }
        const productId = resultProduct.insertId;
        const resultSucProduct = await connection.query<any>("INSERT INTO Sucursal_Productos (producto_id, sucursal_id) VALUES (?, ?)", [productId, 1]);
        if (!resultSucProduct.affectedRows) {
          throw new Error("Error al crear el producto en la sucursal");
        }
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
