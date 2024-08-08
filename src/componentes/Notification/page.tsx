"use client";

import Link from "next/link";
import st from "./notification.module.css";

export default function NotificationNew(props: any) {
  const { products } = props;

  const handleClick = () => {
    document.getElementById("list-products")?.classList.toggle("hidden");
  };

  return (
    <>
      <button
        className="text-red-400 grow cursor-pointer"
        onClick={() => handleClick()}
      >
        <svg
          id="icon"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="red"
          className={`fill-red-400 w-6 h-6 rounded ${st.animation}`}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0M3.124 7.5A8.969 8.969 0 0 1 5.292 3m13.416 0a8.969 8.969 0 0 1 2.168 4.5"
          />
        </svg>
      </button>
      {/* Modal productos */}
      <div id="list-products" className="fixed hidden mt-12 mr-2">
        <div className="bg-red-100 p-2 rounded-lg flex items-center">
          <p className="text-xs mr-1 text-red-700">
            Tienes productos sin stock
          </p>
          {/* <ul className="mt-4">
            {products.map((product:any, index:number) => (
              <li key={index}>{product.nombre}</li>
              ))}
          </ul> */}
          <Link className="rounded-lg mr-1" href={'/dashboard/products?ms=true'} onClick={() => handleClick()}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-6 h-6 fill-green-600 hover:fill-green-700"
            >
              <path
                fillRule="evenodd"
                d="M7.5 3.75A1.5 1.5 0 0 0 6 5.25v13.5a1.5 1.5 0 0 0 1.5 1.5h6a1.5 1.5 0 0 0 1.5-1.5V15a.75.75 0 0 1 1.5 0v3.75a3 3 0 0 1-3 3h-6a3 3 0 0 1-3-3V5.25a3 3 0 0 1 3-3h6a3 3 0 0 1 3 3V9A.75.75 0 0 1 15 9V5.25a1.5 1.5 0 0 0-1.5-1.5h-6Zm10.72 4.72a.75.75 0 0 1 1.06 0l3 3a.75.75 0 0 1 0 1.06l-3 3a.75.75 0 1 1-1.06-1.06l1.72-1.72H9a.75.75 0 0 1 0-1.5h10.94l-1.72-1.72a.75.75 0 0 1 0-1.06Z"
                clipRule="evenodd"
              />
            </svg>
          </Link>
          <button className="rounded-lg mr-0" onClick={() => handleClick()}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill=""
              className="w-6 h-6 fill-red-500 hover:fill-red-700"
            >
              <path
                fillRule="evenodd"
                d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm-1.72 6.97a.75.75 0 1 0-1.06 1.06L10.94 12l-1.72 1.72a.75.75 0 1 0 1.06 1.06L12 13.06l1.72 1.72a.75.75 0 1 0 1.06-1.06L13.06 12l1.72-1.72a.75.75 0 1 0-1.06-1.06L12 10.94l-1.72-1.72Z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>
      </div>
    </>
  );
}
