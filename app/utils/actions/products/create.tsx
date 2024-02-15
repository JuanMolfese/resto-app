'use server';

import { redirect } from "next/navigation";
import { connection } from "../../models/db";
import { Producto } from "../../models/types/producto";
import { revalidatePath } from "next/cache";

export default async function createProduct(formData: FormData) {
  try {
    const rawFormData = {
      nombre: formData.get("name"),
      subrubro_id: formData.get("subrubroId"),
    };
    
    const result = await connection.query<Producto>("INSERT INTO Producto (nombre, subrubro_id) VALUES (?, ?)", [rawFormData.nombre, rawFormData.subrubro_id]);
    await connection.end();
    revalidatePath("/dashboard/products");
    redirect("/dashboard/products");
  }
  catch (error) {
    console.log(error);
  }
}