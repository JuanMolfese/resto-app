"use client"
import Link from "next/link";
import { useState } from "react";


export default function LocationPreference(){ 

    const [option, setOption] = useState<'pickup' | 'delivery' | null>(null);
    const [address, setAddress] = useState('');
    const [submitButtonDisabled, setSubmitButtonDisabled] = useState(true);
  
    const handleOptionChange = (newOption: 'pickup' | 'delivery') => {
      setOption(newOption);
      updateSubmitButtonState(newOption, address);
    };
  
    const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const newAddress = e.target.value;
      setAddress(newAddress);
      updateSubmitButtonState(option, newAddress);
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
      {option === 'delivery' && (
        <div>
          <label className="block mb-2 mt-2 font-bold">Dirección de entrega:</label>
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
        </div>
      )}
  </div>
  <div className="h-1/2">    
    <label className="block mt-10 font-bold">Forma de pago:</label>

    {/* AQUI SE TENDRIA QUE GUARDAR EN LA API EN ALGUN LUGAR DONDE QUEDA EL DETALLE COMPLETO DEL PEDIDO: productos, si esta pago o no y si retira o va a domilicio */}
    <div className="justify-center items-center flex flex-col">        
      <button className={`px-4 py-2 my-4 w-[70%] rounded border ${submitButtonDisabled ? 'bg-gray-300 text-gray-700 cursor-not-allowed' : 'bg-green-500 text-white hover:bg-green-600'}`}
      disabled={submitButtonDisabled}>
        <Link href="/productos/checkout"> {/* Esto hace que no quede deshabilitado realmente hasta que una opcion de entrega se seleccionada */}
          Pagar ahora
        </Link>
      </button>
      
      {/* <Link href="/api/pedidos"> A DEFINIR, esto enviaria el modulo de pedido PAGO: NO, detalle de entrega y detalle de productos*/}
          <button
          type="submit"
          disabled={submitButtonDisabled}
          className={`px-4 py-2 my-4 w-[70%] rounded border ${submitButtonDisabled ? 'bg-gray-300 text-gray-700 cursor-not-allowed' : 'bg-sky-800 text-white hover:bg-sky-600'}`}>
          Pago en el local
          </button>
      {/* </Link> */}   
    </div>
  </div>
</div>
  )
}