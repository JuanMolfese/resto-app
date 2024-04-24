import { connection } from "../../models/db";
import { Usuario, UsuarioDetail } from "../../models/types/usuario";

export async function fetchUsers() {
  try {
    const response = await connection.query<UsuarioDetail[]>('SELECT * FROM Usuario u join Rol r on u.rol_id = r.id');
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