import Link from "next/link";

export default function Cart(
  { cart, removeProductCart, viewCart }: 
  { cart: any[], removeProductCart: Function, viewCart: Function }
) {
  return(
    <>
      <h1 className="text-center text-xl font-bold mb-2">Carrito de compras</h1>
      <table className="w-full divide-y divide-gray-200">
        <tbody className="bg-white-200 divide-y divide-gray-200">
          {cart.map(product => (
            <tr key={product.id} className="text-center mt-2">
              <td className="px-4 py-2 whitespace-nowrap">{product.nombre}</td>
              <td className="px-4 py-2 whitespace-nowrap">{product.cantidad}</td>
              <td className="px-4 py-2 whitespace-nowrap">{(product.precio).toLocaleString('es-ar', {style: 'currency', currency: 'ARS', minimumFractionDigits: 2})}</td>
              <td className="px-4 py-2 whitespace-nowrap flex justify-center items-center py-1">
                <button className="bg-red-500 text-white rounded-full p-1 hover:bg-red-600" onClick={() => {
                  /* const newCart = cart.filter(p => p.id !== product.id);
                  setCart(newCart);
                  if (newCart.length === 0) {
                    viewCart();
                  } */
                  removeProductCart(product);
                }}>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                  </svg>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex justify-end mt-4">
        <span className="text-xl font-bold">Total: {cart.reduce((acc, p) => acc + (p.precio * p.cantidad), 0).toLocaleString('es-ar', {style: 'currency', currency: 'ARS', minimumFractionDigits: 2})}</span>
      </div>
      <div className="flex justify-around">
        <button className="mt-8 mx-auto py-2 px-4 text-white border rounded-full bg-blue-400 hover:bg-blue-500 flex justify-center lg:hidden" onClick={() => viewCart()}>
          Seguir comprando
        </button>
        {
          cart.length > 0 && (
            <Link href="/productos/locationPreference">
              <button className="mt-8 mx-auto py-2 px-4 text-white border rounded-full bg-blue-400 hover:bg-blue-500 flex justify-center">
                Continuar compra
              </button>
            </Link>
          )
        }

      </div>
    </>
  )
}