"use client"

import { Button } from "@/components/ui/button";
import { ButtonIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Checkout(){ 

  const [cart, setCart] = useState<any[]>([]);

  useEffect(() => {
    getCart();
  }, []);
 

  const getCart = async () => {
    const res = await fetch('/api/client/cart');
    if (res.ok) {
      const { cart } = await res.json();
      setCart(cart);
    }
  }


  if (cart.length <= 0) {
    return (
      <div>
        <h1>No hay productos en el carrito</h1>
      </div>
    )
  }

  return (
    <div>
      <h1>Formulario de envio</h1>
      <Button  asChild variant={"link"}>
        <Link href="/productos/">
          Volver
        </Link>
      </Button>
    </div>
  )
}
