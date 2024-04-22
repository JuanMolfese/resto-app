"use client"
import { Button } from "@/components/ui/button";
import { ButtonIcon } from "@radix-ui/react-icons";
import { Radio } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { initMercadoPago, Wallet } from '@mercadopago/sdk-react';



export default function Checkout(){   
  
  const [cart, setCart] = useState<any[]>([]);  
  const [cartAmount, setCartAmount] = useState<Number>(0);  
  const [preferenceId, setPreferenceId] = useState<any>(null);
  
  useEffect(() => {
    initMercadoPago("APP_USR-d6ca0af3-157e-427a-8c3c-e720ff70bcd9", { locale: 'es-AR' });
    getCart();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Solo se ejecuta una vez al inicio

 const getCart = async () => {
    try {
      const res = await fetch('/api/client/cart');
      if (res.ok) {
        const { cart } = await res.json();
        console.log("Cart:", cart);
        setCart(cart);
        setCartAmount(calcTotal(cart)); // Calcular el total del carrito después de obtenerlo
      }
    } catch(err) {
      console.error("Error al obtener el carrito:", err);
    }
  };

  const calcTotal = (cart: any[]) => {
    let total = 0;
    for (const producto of cart){
      total += producto.precio * producto.cantidad;
    }
    console.log("Total calculado:", total); // Verificar si se calcula el total correctamente
    return total;
  };

  // MERCARDO PAGO //
  const createPreference = async () => {
    try{
      const compra = {           
        id:"Compra",
        title: "El Balcon",
        quantity: Number (1),
        unit_price: cartAmount,
      }        
      const response:any = await fetch('/api/mp_preference',{
        method:'POST',
        headers:{
          'Content-Type':'application/json'
        },
        body:JSON.stringify(compra),
      });
      
      const responseData = await response.json();
      
      return responseData.result.id;
 
    }catch(err)
      {console.log("Error al realizar la compra", err)};       
  }; 

  const handleClick = async ()=> {    
    const id = await createPreference();
    console.log("Se generó la preferencia: " + id );    
    if(id!=null) {
      setPreferenceId(id);
    }
  };  

  /* setTimeout(()=>{ */
    if (cart.length <= 0) {
      return (
        <div>
          <h1>No hay productos en el carrito</h1>
        </div>
      )
    }
  /* },500 ); */
 
  return (
    <div className="flex flex-col items-center m-3 pt-8">
      
     {/*  <div className='flex mt-[40%] flex-col items-center w-[85%]'>
        <Wallet initialization={{preferenceId: {preference}} />
      </div>  */}
      {preferenceId ? 
        (<Wallet initialization={{preferenceId: preferenceId }} customization={{ texts:{ valueProp: 'smart_option'}}} />)
        :
        (<Button className="p-4 mt-9 w-[70%] rounded border bg-blue-700 text-white" onClick={handleClick}>Pagar</Button>)
      }

      <Button  asChild variant={"link"}  className="p-4 mt-9 w-[70%] rounded border bg-blue-500 text-white">
        <Link href="/productos/">
          Volver
        </Link>
      </Button>

    </div>
  )
}