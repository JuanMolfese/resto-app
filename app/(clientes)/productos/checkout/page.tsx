"use client"

import { Button } from "@/components/ui/button";
import { ButtonIcon } from "@radix-ui/react-icons";
import { Radio } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import mp_config from "./mp_config";
import MP_Button from "./mp_button";

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
  
  /* const handleClick = async () => {
    
    const compra = {           
      id:"Compra",
      title: "Compra El Balcon",
      quantity: 1,
      unit_price: Number(1000),
    }  
    
    await mp_config(compra);               
  }; */


  if (cart.length <= 0) {
    return (
      <div>
        <h1>No hay productos en el carrito</h1>
      </div>
    )
  }
 
  return (
    <div className="flex flex-col items-center m-0 p-0">

      <MP_Button/>

      <Button  asChild variant={"link"}  className="p-4 mt-9 w-[70%] rounded border bg-blue-500 text-white">
        <Link href="/productos/">
          Volver
        </Link>
      </Button>

    </div>
  )
}
