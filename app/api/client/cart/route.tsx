import { NextApiRequest, NextApiResponse } from "next";
import { NextResponse } from "next/server";
import { ProductoDetail } from "../../../utils/models/types/producto";

interface ProductInCart extends ProductoDetail {
  cantidad: number;
}

const cart: ProductInCart[] = [];

export async function GET() {
  return NextResponse.json({ cart: cart },{ status: 200 });
}

export async function POST(req: Request) {
  try {
    const { producto, cant } = await req.json();
    const index = cart.findIndex(p => p.id === producto.id);
    if (index === -1) {
      cart.push({...producto, cantidad: parseInt(cant)});
    } else {
      cart[index].cantidad += parseInt(cant);
    }
    return NextResponse.json({ cart: cart },{ status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error },{ status: 500 });
  } 
}

export async function DELETE(req: Request) {
  const { producto } = await req.json();
  const index = cart.findIndex(p => p.id === producto.id);
  cart.splice(index, 1);
  return NextResponse.json({ cart: cart },{ status: 200 });
}