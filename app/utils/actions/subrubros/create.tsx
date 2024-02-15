"use server"

export default async function createSubrubro(formData: FormData) {
  try {
    const rawFormData = {      
      rubro_id: formData.get("rubroId"),      
      nombre: formData.get("name"),
      
    };
    console.log(rawFormData);
  }
  catch (error) {
    console.log(error);
  }
}