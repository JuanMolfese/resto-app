import { unstable_noStore } from "next/cache";
import { connection } from "../../models/db";
import { Usuario, UsuarioDetail } from "../../models/types/usuario";

export async function fetchUsers() {
  unstable_noStore();
  try {
    const response = await connection.query<UsuarioDetail[]>('SELECT u.*, r.descripcion FROM Usuario u join Rol r on u.rol_id = r.id');
    await connection.end();
    
    const user = response.map((user) => {
      return {
        id: user.id,
        email: user.email,
        nombre: user.nombre,
        apellido: user.apellido,
        rol_id: user.rol_id,
        descripcion: user.descripcion
      };
    });
    return user;
  } catch (error) {
    console.error(error);
  }
}

export async function fetchUserByEmail(email: string) {
  try {
    const response = await connection.query<UsuarioDetail[]>('SELECT * FROM Usuario u join Rol r on u.rol_id = r.id WHERE email = ?', [email]);
    await connection.end();
    
    const user = response.map((user) => {
      return {
        id: user.id,
        email: user.email,
        nombre: user.nombre,
        apellido: user.apellido,
        rol_id: user.rol_id,
        descripcion: user.descripcion
      };
    });
    return user;
  } catch (error) {
    console.error(error);
  }
}