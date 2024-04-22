import { NextApiRequest } from "next";
import { NextResponse } from "next/server";

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
    console.log('password',password);
    NextResponse.json({ message: `"Contraseña cambiada correctamente"`, status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error },{ status: 500 });
  }
  return NextResponse.json({ message: "Database error", status: 500 });
}

export async function DELETE({ params } : {params: {id: string}}) {
  try {
    const { id } = params;
    const res = await fetch(`http://localhost:3000/api/usuario/${id}`, {
      method: "DELETE"
    });
    return NextResponse.json({ message: "Usuario eliminado correctamente", status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error },{ status: 500 });
  }
}