"use client"

import { Button } from "@/components/ui/button";
import { ButtonIcon } from "@radix-ui/react-icons";
import { Radio } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Checkout(){ 
  
  const [cart, setCart] = useState<any[]>([]);
  
  useEffect(() => {
    getCart();
  }, []);
  
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

  const handleSubmit = () => {
    // Aquí puedes manejar la lógica de envío, por ejemplo, enviar los datos al servidor
    console.log('Formulario enviado:', { option, address });
  };

  
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
      
      <div className="space-y-4">
      <div>
        <label className="block mb-2 font-bold">Seleccionar opción:</label>
        <div className="space-x-4">
          <button
            className={`px-4 py-2 rounded-full border ${
              option === 'pickup' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'
            }`}
            onClick={() => handleOptionChange('pickup')}
          >
            Retiro en el local
          </button>
          <button
            className={`px-4 py-2 rounded-full border ${
              option === 'delivery' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'
            }`}
            onClick={() => handleOptionChange('delivery')}
          >
            Envío a domicilio
          </button>
        </div>
      </div>
      {option === 'delivery' && (
        <div>
          <label className="block mb-2 font-bold">Dirección de entrega:</label>
          <input
            type="text"
            value={address}
            onChange={handleAddressChange}
            placeholder="Ingrese su dirección"
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
          />
        </div>
      )}
      <button
        type="submit"
        onClick={handleSubmit}
        disabled={submitButtonDisabled}
        className={`w-full px-4 py-2 rounded-full ${
          submitButtonDisabled ? 'bg-gray-300 text-gray-700 cursor-not-allowed' : 'bg-blue-500 text-white hover:bg-blue-600'
        }`}
      >
        Enviar
      </button>
    </div>

      <Button  asChild variant={"link"}>
        <Link href="/productos/">
          Volver
        </Link>
      </Button>
    </div>
  )
}
