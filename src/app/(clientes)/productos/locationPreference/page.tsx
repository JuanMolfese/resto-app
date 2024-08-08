"use client"
import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { Wallet, initMercadoPago } from "@mercadopago/sdk-react";
import Link from "next/link";
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger,} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button"
import { clearCart } from '@/redux/features/cartSlice';

export default function LocationPreference(){
  const [option, setOption] = useState<'pickup' | 'delivery' | null>(null);
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [step, setStep] = useState(1);
  const router = useRouter();
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const carrito = useAppSelector(state => state.cart);
  const [preferenceId, setPreferenceId] = useState<any>(null);
  const dispatch = useAppDispatch();
  
    useEffect(() => {
      initMercadoPago( process.env.NEXT_PUBLIC_MP_PUBLIC_KEY!, { locale: 'es-AR' });
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []); // Solo se ejecuta una vez al inicio

  // MERCARDO PAGO //
    const createPreference = async () => {
      try{
        const compra = {           
          id:"Compra",
          description:"Pizza 3",
          title: "Pizza 3",
          quantity: Number (1),
          unit_price: carrito.total,
          cart: carrito.items,
          option: option,
          name: name,
          address: address,
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

    const createUnpaidOrder = async () =>{
      try {
        const unpaidOrder = {
          option: option,
          name: name,
          address: address,
          cart: carrito.items,
          cart_price: carrito.total,
        }
        const response:any = await fetch('/api/unpaid-order',{
          method:'POST',
          headers:{
            'Content-Type':'application/json'
          },
          body:JSON.stringify(unpaidOrder),        
        });
        const responseData = await response.json();
        if (responseData.success){
          //Borro el carrito y muestro el modal 
          dispatch(clearCart());
          setIsDialogOpen(true); 
           return responseData.result.id;            
        }
      } catch (error) {
        {console.log("Error al realizar el pedido", error)};
      }
    }

    const handleClick = async ()=> {    
      const id = await createPreference();
      console.log("Se generó la preferencia: " + id );    
      if(id!=null) {
        setPreferenceId(id);
      }
    }; 

  const handleOptionChange = (newOption: 'pickup' | 'delivery') => {
    setOption(newOption);
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAddress(e.target.value);
  };

  const handleNextStep = () => {
    setStep(2);
  }; 

  const handleDialogConfirm = () => {
    setIsDialogOpen(false);    
    router.push('/productos');    
  };

  return (
    <div className="space-y-4 m-8 md:m-auto md:max-w-[50%] md:mt-10">
      {step === 1 ? (
        <>
          <div>
            <label className="block mb-10 font-bold">Seleccionar modo de entrega:</label>
            <div className="space-x-4 flex justify-center">
              <button
                className={`px-4 py-2 rounded-lg border w-[45%] font-bold drop-shadow-md ${
                  option === 'pickup' ? 'bg-slate-800 text-white' : 'bg-gray-200 text-gray-700'
                }`}
                onClick={() => handleOptionChange('pickup')}
              >
                Retiro en el local
              </button>
              <button
                className={`px-4 py-2 rounded-lg border w-[45%] font-bold drop-shadow-md ${
                  option === 'delivery' ? 'bg-slate-800 text-white' : 'bg-gray-200 text-gray-700'
                }`}
                onClick={() => handleOptionChange('delivery')}
              >
                Envío a domicilio
              </button>
            </div>
          </div>
          {option && (
            <div>
              <div className="mt-4 flex justify-center">
                <input
                  type="text"
                  value={name}
                  onChange={handleNameChange}
                  placeholder="Ingrese su nombre"
                  className="w-[90%] p-2 border mt-10 drop-shadow-md border-slate-800 rounded-md focus:outline-none focus:border-red-500 placeholder-gray-600"
                />
              </div>
              {option === 'delivery' && (
                <div className="mt-4 flex justify-center">
                  <input
                    type="text"
                    value={address}
                    onChange={handleAddressChange}
                    placeholder="Ingrese su dirección"
                    className="w-[90%] mt-8 p-2 border drop-shadow-md border-slate-800 rounded-md focus:outline-none focus:border-red-500 placeholder-gray-600"
                  />
                </div>
              )}
            </div>
          )}
          <div className="flex justify-center w-full fixed bottom-20 left-0 md:w-[50%] md:mx-auto md:left-auto">
          {option && name.trim() && (option === 'pickup' || (option === 'delivery' && address.trim().length >= 5)) && (
            <>
              <button
                type="button"                
                className="w-[20%] px-4 py-2 rounded-lg drop-shadow-md h-16 bg-slate-800 text-white hover:bg-slate-900"
              >
                <Link href="/productos">
                  Volver
                </Link>
              </button>
              <button
                type="button"
                onClick={handleNextStep}
                className="w-[55%] px-4 py-2 ml-4 rounded-lg drop-shadow-md h-16 bg-slate-800 text-white hover:bg-slate-900"
              >
                Siguiente
              </button>
            </>
          )}
          </div>
        </>
      ) : (        
          <div className="h-[90vh] flex justify-center items-center flex-col">
            <Image
              src="/LogoPizza3_high.png"
              width={250}
              height={200}
              alt="Logo"
              className="mb-10"
            />            
            {
              preferenceId ? 
              <>
                <Wallet initialization={{preferenceId: preferenceId }} customization={{ texts:{ valueProp: 'smart_option'}}} />
                <button 
                type="button"              
                className="px-4 py-2 mt-14 w-[70%] rounded-lg bg-slate-500 text-white hover:bg-slate-500"
                >
                <Link href="/productos">
                  Cancelar
                </Link>
              </button>
              </>
              :  
              <button className="px-4 py-2 my-12 w-[70%] rounded-lg bg-slate-800 text-white hover:bg-sky-600"
              onClick={handleClick}>
                  Pagar ahora
              </button>
            }            
             {!preferenceId && (
              <button 
                type="button"
                onClick={createUnpaidOrder}
                className="px-4 py-2 my-4 w-[70%] rounded-lg bg-slate-800 text-white hover:bg-sky-600"
              >
                {option === 'delivery' ? "Pagar al recibir" : "Pagar al retirar"}
              </button>
              )}

              {!preferenceId && (
              <button 
                type="button"              
                className="px-4 py-2 mt-4 w-[70%] rounded-lg bg-slate-500 text-white hover:bg-sky-600"
              >
                <Link href="/productos">
                  Cancelar
                </Link>
              </button>
              )}

          </div>        
      )
    }
    {isDialogOpen && (
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent className="h-[40%] w-[85%] rounded-lg">
            <DialogHeader>
              <DialogTitle>Pedido Confirmado</DialogTitle>
              <DialogDescription className="text-base pt-8">
                {option === 'pickup' ? 'Te esperamos en 30 minutos en nuestro local para retirar tu pedido'
                :`En 30 minutos aproximadamente recibirás tu pedido en ${address}.`}
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button type="button" onClick={handleDialogConfirm}>Confirmar</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};





/*"use client"
import { useAppSelector } from "@/redux/hooks";
import { Wallet, initMercadoPago } from "@mercadopago/sdk-react";
import Link from "next/link";
import { useEffect, useState } from "react";


export default function LocationPreference(){ 

    const [option, setOption] = useState<'pickup' | 'delivery' | null>(null);
    const [address, setAddress] = useState('');
    const [lastName, setlastName] = useState('');
    const [submitButtonDisabled, setSubmitButtonDisabled] = useState(true);



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
          description:"Pizza 3",
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
   
  
    const handleOptionChange = (newOption: 'pickup' | 'delivery') => {
      setOption(newOption);
      updateSubmitButtonState(newOption, address);      
    };
  
    const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const newAddress = e.target.value;
      setAddress(newAddress);
      updateSubmitButtonState(option, newAddress);
    };
    const handlelastNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const newlastName = e.target.value;
      setlastName(newlastName);      
    };

    const updateSubmitButtonState = (selectedOption: 'pickup' | 'delivery' | null, newAddress: string) => {
      if (selectedOption === 'pickup') {
        // Habilitar el botón de enviar si se selecciona "Retiro en local"
        setSubmitButtonDisabled(false);
      } else if (selectedOption === 'delivery') {
        // Habilitar el botón de enviar solo si se selecciona "Envío a domicilio" y se ingresa una dirección válida
        setSubmitButtonDisabled(newAddress.trim().length < 5);
      } else {
        // Deshabilitar el botón de enviar si no se ha seleccionado ninguna opción
        setSubmitButtonDisabled(true);
      }
    };

    if (carrito.items.length <= 0) {
      window.location.href = "/productos";
    }
   

  return(
  <div className="m-4">      
    <div className="space-y-4 min-h-[300px]">
        <div className="h-1/2 ">            
          <label className="block mb-2 font-bold">Seleccionar opción de entrega:</label>          
          <div className="flex flex-col items">              
            <div className="justify-center items-center flex flex-col">                
              <button
              className={`px-4 py-2 my-4 w-[70%] rounded border ${
                  option === 'pickup' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'
              }`}
              onClick={() => handleOptionChange('pickup')}
              >
              Retiro en el local
              </button>
              
              <button
              className={`px-4 py-2 my-4 w-[70%] rounded border ${
                  option === 'delivery' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'
              }`}
              onClick={() => handleOptionChange('delivery')}
              >
              Envío a domicilio
              </button>
            </div>
          </div>
        </div>
        {option === 'pickup' && (
          <div className="flex justify-center items-center space-x-6 mt-2">
          <input
          type="text"
          value={lastName}
          onChange={handlelastNameChange}
          maxLength={100}
          placeholder="Ingrese su nombre completo"
          className="w-[80%] p-2 border m-auto border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
          />
        </div>
        )}
      {option === 'delivery' && (
        <div>
          
          <div className="flex justify-center items-center space-x-6">
            <input
            type="text"
            value={address}
            onChange={handleAddressChange}
            maxLength={100}
            placeholder="Ingrese su dirección"
            className="w-[80%] p-2 border m-auto border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
            />
          </div>
          <div className="flex justify-center items-center space-x-6 mt-2">
            <input
            type="text"
            value={lastName}
            onChange={handlelastNameChange}
            maxLength={100}
            placeholder="Ingrese su nombre completo"
            className="w-[80%] p-2 border m-auto border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
            />
          </div>
        </div>
      )}
  </div>
  <div className="h-1/2">    
    <label className="block mt-10 font-bold">Forma de pago:</label>

    
    <div className="justify-center items-center flex flex-col">             
      {
        preferenceId ? 
        <Wallet initialization={{preferenceId: preferenceId }} customization={{ texts:{ valueProp: 'smart_option'}}} />
        :  
        <button className={`px-4 py-2 my-4 w-[70%] rounded border ${submitButtonDisabled ? 'bg-gray-300 text-gray-700 cursor-not-allowed' : 'bg-green-500 text-white hover:bg-green-600'}`}
        disabled={submitButtonDisabled} onClick={handleClick}>
            Pagar ahora
        </button>
      }
*/
     {/* <Link href="/api/pedidos"> A DEFINIR, esto enviaria el modulo de pedido PAGO: NO, detalle de entrega y detalle de productos*/}
/*     <button
          type="submit"
          disabled={submitButtonDisabled}
          className={`px-4 py-2 my-4 w-[70%] rounded border ${submitButtonDisabled ? 'bg-gray-300 text-gray-700 cursor-not-allowed' : 'bg-sky-800 text-white hover:bg-sky-600'}`}>
           {option === 'delivery' ? "Pagar al recibir" :  "Pagar al retirar"}
          </button>
*/
      {/* </Link> */}   
/* 
   </div>
  </div>
</div>
  )

  */