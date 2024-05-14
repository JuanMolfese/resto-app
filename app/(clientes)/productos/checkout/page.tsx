"use client"
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useEffect, useState } from "react";
import { initMercadoPago, Wallet } from '@mercadopago/sdk-react';
import { useAppSelector } from "@/redux/hooks";



export default function Checkout(){   

  const carrito = useAppSelector(state => state.cart);
  const [preferenceId, setPreferenceId] = useState<any>(null);
  
  useEffect(() => {
    initMercadoPago( process.env.NEXT_PUBLIC_MP_PUBLIC_KEY!, { locale: 'es-AR' });
       
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Solo se ejecuta una vez al inicio

  // MERCARDO PAGO //
  const createPreference = async () => {
    try{
      const compra = {           
        id:"Compra",
        title: "Pizza 3",
        quantity: Number (1),
        unit_price: carrito.total,
        cart: carrito.items
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

  setTimeout(()=>{
    if (carrito.items.length <= 0) {
      return (
        <div>
          <h1>No hay productos en el carrito</h1>
        </div>
      )
    }
  },500 );
 
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