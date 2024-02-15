"use server"

export default async function createRubro(formData: FormData) {
  try {
    const rawFormData = {            
      nombre: formData.get("name"),      
    };
    console.log(rawFormData);
  }
  catch (error) {
    console.log(error);
  }
}