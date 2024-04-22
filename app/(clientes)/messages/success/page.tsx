"use client"
import Link from 'next/link';
import React from 'react';

function success() {
  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center">
      <div className="bg-white shadow-md rounded-lg p-8 max-w-sm w-4/5">
        <div className="text-green-500 text-6xl text-center mb-4">&#10004;</div>
        <h1 className="text-2xl font-bold text-center mb-4">Pago Aprobado !</h1>
        <p className="text-center text-gray-700 mb-6">Gracias por tu compra !</p>
        <div className="flex justify-center">
          <button className="bg-green-500 text-white px-6 py-2 rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50">
            <Link href="/productos/">
                Volver a El Balcon
            </Link>
          </button>
        </div>
      </div>
    </div>
  );
}

export default success;