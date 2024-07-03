"use server"
import { redirect } from "next/navigation";
import { connection } from "../../models/db";
import { revalidatePath } from "next/cache";
import { Sucursal_productos } from "../../models/types/sucursal_productos";
import { writeFile } from "fs/promises";
import path from "path";
import { buffer } from "stream/consumers";
import {v2 as cloudinary} from 'cloudinary';
          
cloudinary.config({ 
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY, 
  api_secret: process.env.CLOUDINARY_API_SECRET, 
});

export default async function createProduct(formData: FormData) {
  
  let res;

  try {
    const rawFormData = {
      nombre: formData.get("name"),
      subrubro_id: formData.get("subrubroId"),      
    };    
   
    const image = formData.get("productImage");
    
    if(image instanceof File) {    
      const bytes = await image.arrayBuffer();
      const buffer = Buffer.from(bytes);
      const filePath = path.join(process.cwd(), 'public', image.name)    
      await writeFile(filePath, buffer)      
      res = await cloudinary.uploader.upload(filePath);      
    } 
   
    if(!res) {
      throw new Error('No se pudo cargar la imagen');
    }
  
    console.log(res.secure_url);

    const resultProduct = await connection.query<any>("INSERT INTO producto (nombre, subrubro_id, image) VALUES (?, ?, ?)", 
    [rawFormData.nombre, rawFormData.subrubro_id, res.secure_url]);
    
    if (!resultProduct.affectedRows) {
      throw new Error("Error al crear el producto");
    }
    const productId = resultProduct.insertId;
    const resultSucProduct = await connection.query<any>("INSERT INTO sucursal_productos (producto_id, sucursal_id) VALUES (?, ?)", [productId, 1]);
    await connection.end();
    if (!resultSucProduct.affectedRows) {
      throw new Error("Error al crear el producto en la sucursal");
    }
    return {
      success: true,
      message: "Producto creado",
    }
  }
  catch (error) {
    return {
      success: false,
      message: "Error al crear el producto",
    }
  }
}