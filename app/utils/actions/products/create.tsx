"use server"

export default async function createProduct(formData: FormData) {
  try {
    const rawFormData = {
      nombre: formData.get("name"),
      rubro: formData.get("rubroId"),
      subrubro_id: formData.get("subrubroId"),
    };
    console.log(rawFormData);
  }
  catch (error) {
    console.log(error);
  }
}