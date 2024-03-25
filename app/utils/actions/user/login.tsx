import { connection } from "../../models/db";
import { Usuario } from "../../models/types/usuario";

export default async function Login(req: any , res: any){
  try {
    const { email, password } = req.params;
    const result = await connection.query<Usuario[]>("Select * From Usuario WHERE email = ? AND pass = ?", [email, password]);
    await connection.end();
    const user = result.map((user) => {
      return {
        /* id: user.id,
        email: user.email,
        pass: user.pass,
        nombre: user.nombre,
        apellido: user.apellido,
        rol_id: user.rol_id, */
        email: user.email,
      }
    })
    return user;
  } catch (error) {
    console.log(error);
  }
}