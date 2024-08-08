import { NextApiRequest } from "next";
import { NextResponse } from "next/server";
import { connectdb } from "../../../utils/models/db";
import { Usuario } from "../../../utils/models/types/usuario";
import { hash } from "bcrypt";

export async function GET(req: Request, { params } : {params: {id: number}}) {
  let connection;
  try {
    connection = await connectdb.getConnection();
    const id = params.id;
    const res = await connection.execute(`SELECT u.*, r.descripcion FROM Usuario u LEFT JOIN Rol r ON u.rol_id = r.id WHERE u.id = ${id}`);
    return NextResponse.json({data: res[0], status: 200});
  } catch (error) {
    return NextResponse.json({ error: error },{ status: 500 });
  } finally {
    if (connection) {
      connection.release();
    }
  }
}

export async function PUT(request: Request, {params}: {params: {id: number}}) {
  let connection;
  try {
    connection = await connectdb.getConnection();
    let mensaje = "";
    const id = params.id;
    const { password, id_rol } = await request.json();  
    if (password) {
      const passHash = await hash(password, 10);
      await connection.execute(`UPDATE Usuario SET pass = '${passHash}' WHERE id = ${id}`);
      mensaje = "Contraseña actualizada correctamente";
    }
    if (id_rol) {
      await connection.execute(`UPDATE Usuario SET rol_id = ${id_rol} WHERE id = ${id}`);
      mensaje = "Rol actualizado correctamente";
    }
    return NextResponse.json({ message: mensaje, status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error },{ status: 500 });
  } finally {
    if (connection) {
      connection.release();
    }
  }
}

export async function DELETE(req: Request) {
  const { user } = await req.json();
  let connection;
  try {
    connection = await connectdb.getConnection();
    await connection.execute(`DELETE FROM Usuario WHERE id = ${user.id}`);
    return NextResponse.json({ message: "Usuario eliminado correctamente", status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "El usuario no pudo ser eliminado" },{ status: 500 });
  } finally {
    if (connection) {
      connection.release();
    }
  }
 
  /* try {
    const res = await fetch(`http://localhost:3000/api/usuario/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json"
      },
    });
    console.log(res);
    return NextResponse.json({ message: "Usuario eliminado correctamente", status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error },{ status: 500 });
  } */
}