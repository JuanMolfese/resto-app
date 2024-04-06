"use client"

import { Button } from "@/components/ui/button";
import { ButtonIcon } from "@radix-ui/react-icons";
import { Radio } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { initMercadoPago, Wallet } from '@mercadopago/sdk-react';


export default function Checkout(){ 
  
  const [cart, setCart] = useState<any[]>([]);
  
  useEffect(() => {
    getCart();
  }, []);
  
  
  useEffect(() => {
    initMercadoPago(process.env.MP_PUBLIC_KEY!, { locale: 'es-AR' });
  }, []);
  
  
  const getCart = async () => {
    const res = await fetch('/api/client/cart');
    if (res.ok) {
      const { cart } = await res.json();
      setCart(cart);
    }
  }
  
  const handleClick = async () => {
    try{
    const compra = {           
      id:"Compra",
      title: "Compra El Balcon",
      quantity: 1,
      unit_price: Number(1000),
    }  
    const response = await fetch('/api/mp_preference',{
        method:'POST',
        headers:{
          'Content-Type':'application/json'
        },
        body:JSON.stringify(compra),
    })
    
   /*  const preference = await response.json();
      <Wallet initialization={{preferenceId: preference }} customization={{ texts:{ valueProp: 'smart_option'}}}/>
  */
    }catch(err)
      {console.log("Error al realizar la compra")}; 
    
  }; 
  

  if (cart.length <= 0) {
    return (
      <div>
        <h1>No hay productos en el carrito</h1>
      </div>
    )
  }
 
  return (
    <div className="flex flex-col items-center m-0 p-0">

      {/* <MP_Button/> */}
     {/*  <div className='flex mt-[40%] flex-col items-center w-[85%]'>
        <Wallet initialization={{preferenceId: {preference}} />
      </div>  */}

      <Button className="p-4 mt-9 w-[70%] rounded border bg-blue-700 text-white"
      onClick={(handleClick) }>
        Pagar
      </Button>

      <Button  asChild variant={"link"}  className="p-4 mt-9 w-[70%] rounded border bg-blue-500 text-white">
        <Link href="/productos/">
          Volver
        </Link>
      </Button>

    </div>
  )
}
