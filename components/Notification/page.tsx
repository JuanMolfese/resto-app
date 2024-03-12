"use client"

import st from './notification.module.css'

export default function NotificationNew( props:any ) {

  const { products } = props;

  const handleClick = () => {
    document.getElementById('list-products')?.classList.toggle('hidden')    
  }

  return (
    <>
      <button className="text-red-400 grow cursor-pointer" onClick={() => handleClick()}>
        <svg id="icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="red" className={`w-6 h-6 bg-white rounded ${st.animation}`} >
          <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0M3.124 7.5A8.969 8.969 0 0 1 5.292 3m13.416 0a8.969 8.969 0 0 1 2.168 4.5" />
        </svg>
      </button>
      {/* Modal productos */}
      <div id="list-products" className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 hidden">
        <div className="bg-white p-8 rounded-lg">
          <button className="bg-red-500 text-white p-2 rounded-lg mr-0" onClick={() => handleClick()}>Cerrar</button>
          <h2 className="text-xl font-bold">Productos sin stock</h2>
          <ul className="mt-4">
            {products.map((product:any, index:number) => (
              <li key={index}>{product.nombre}</li>
            ))}
          </ul>
          
        </div>
      </div>
    </>
  )
}