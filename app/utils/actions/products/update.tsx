'use server';

import { revalidatePath } from "next/cache";
import { connection } from "../../models/db";
import { ProductoDetail } from "../../models/types/producto";
import {v2 as cloudinary} from 'cloudinary';
import { writeFile } from "fs/promises";
import path from "path";

cloudinary.config({ 
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY, 
  api_secret: process.env.CLOUDINARY_API_SECRET, 
});

export default async function updateProduct(id: number, formData: FormData) {
      
  try {
    const rawFormData = {
      nombre: formData.get("name"),
      id: formData.get("productId"),
      subrubroId: formData.get("subrubroId"),
      precio: formData.get("precio"),
      stock: formData.get("stock"),
      stock_minimo: formData.get("stock_minimo"),      
      image: formData.get("productImage"),
    };     
    
    let imageUrl;

    if (rawFormData.image instanceof File && rawFormData.image.size > 0) {
      // Procesar nueva imagen
      const bytes = await rawFormData.image.arrayBuffer();
      const buffer = Buffer.from(bytes);
      const filePath = path.join(process.cwd(), 'public', rawFormData.image.name);
      await writeFile(filePath, buffer);
      const uploadResult = await cloudinary.uploader.upload(filePath);
      imageUrl = uploadResult.secure_url;        
    
      // Realizar el UPDATE en la base de datos utilizando la URL de la imagen
      const result = await connection.query<ProductoDetail>(`
        UPDATE Producto p JOIN Sucursal_Productos sp on sp.producto_id = p.id
        SET 
          p.nombre = ?,
          p.subrubro_id = ?,
          p.image = ?,
          sp.precio = ?,
          sp.stock = ?,
          sp.stock_minimo = ?
        WHERE id = ?`, 
        [rawFormData.nombre, rawFormData.subrubroId, imageUrl, rawFormData.precio, rawFormData.stock, rawFormData.stock_minimo, rawFormData.id]
      );
  
      await connection.end();
      return { 
        success: true,
        message: 'Producto actualizado.', 
      };
    }else {
      // Si no se proporciona una nueva imagen, realizar el UPDATE sin cambiar el campo de imagen
      const result = await connection.query<ProductoDetail>(`
        UPDATE Producto p JOIN Sucursal_Productos sp on sp.producto_id = p.id
        SET 
          p.nombre = ?,
          p.subrubro_id = ?,
          sp.precio = ?,
          sp.stock = ?,
          sp.stock_minimo = ?
        WHERE id = ?`, 
        [rawFormData.nombre, rawFormData.subrubroId, rawFormData.precio, rawFormData.stock, rawFormData.stock_minimo, rawFormData.id]
      );    
      await connection.end();
      return { 
        success: true,
        message: 'Producto actualizado.', 
      };
    }    
  }catch (error) {
    console.error('Error al actualizar el producto:', error);
    return { 
      success: false,
      message: 'Error al actualizar el producto.', 
    };
  }
}