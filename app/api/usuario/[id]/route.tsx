import { NextApiRequest } from "next";
import { NextResponse } from "next/server";
import { connection } from "../../../utils/models/db";
import { Usuario } from "../../../utils/models/types/usuario";

export async function GET({ params } : {params: {id: string}}) {
  try {
    const { id } = params;
    const res = await fetch(`http://localhost:3000/api/usuario/${id}`);
    const data = await res.json();
    return NextResponse.json({data: data, status: 200});
  } catch (error) {
    return NextResponse.json({ error: error },{ status: 500 });
  }
}

export async function PUT(request: Request, {params}: {params: {id: number}}) {
  try {
    const id = params.id;
    const { password } = await request.json();
    await connection.query<Usuario>(`UPDATE Usuario SET pass = '${password}' WHERE id = ${id}`);
    await connection.end();
    NextResponse.json({ message: "Contraseña cambiada correctamente", status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error },{ status: 500 });
  }
  return NextResponse.json({ message: "Database error", status: 500 });
}

export async function DELETE(req: Request) {
  const { user } = await req.json();
  try {
    await connection.query<Usuario>(`DELETE FROM Usuario WHERE id = ${user.id}`);
    await connection.end();
    return NextResponse.json({ message: "Usuario eliminado correctamente", status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "El usuario no pudo ser eliminado" },{ status: 500 });
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