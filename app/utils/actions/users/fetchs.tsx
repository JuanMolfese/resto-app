import { unstable_noStore } from "next/cache";
import { connectdb } from "../../models/db";
import { Usuario, UsuarioDetail } from "../../models/types/usuario";
import { Rol } from "../../models/types/rol";
import { compare } from "bcrypt";

export async function fetchUsers() {
  unstable_noStore();
  let connection;
  try {
    connection = await connectdb.getConnection();
    const response = await connection.execute('SELECT u.*, r.descripcion FROM Usuario u join Rol r on u.rol_id = r.id');
   
    const user = response.map((user: any) => {
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
  } finally {
    if (connection) {
      connection.release();
    }
  }
}

export async function fetchUserByEmail(email: string) {
  let connection;
  try {
    connection = await connectdb.getConnection();
    const response = await connection.execute('SELECT u.id, u.email, u.nombre, u.apellido, u.rol_id, r.descripcion FROM Usuario u join Rol r on u.rol_id = r.id WHERE email = ?', [email]);  
    const user = response.map((user: any) => {
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
  } finally {
    if (connection) {
      connection.release();
    }
  }
}

export async function getRoles() {
  let connection;
  try {
    connection = await connectdb.getConnection();
    const response = await connection.execute('SELECT * FROM Rol');
    const rol = response.map((rol: any) => {
      return {
        id: rol.id,
        descripcion: rol.descripcion
      };
    });
    return rol;
  }
  catch (error) {
    console.error(error);
  } finally {
    if (connection) {
      connection.release();
    }
  }
}

export async function checkPass(pass: string) {
  console.log(pass);
}