import Link from "next/link"
import Notification from "./notification"

export default function navbar( props:any ) {    
    
    return(
        <nav className="flex flex-wrap items-center justify-between p-4 bg-green-700">            
            <div className="block lg:hidden">
                <button className="flex items-center px-3 py-2 text-indigo-500 border border-indigo-500 rounded navbar-burger">
                    <svg className="w-3 h-3 fill-current" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <title>
                            Menu
                        </title>
                        <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z">
                        </path>
                    </svg>
                </button>
            </div>
            <div className="navbar-menu lg:order-2 lg:block lg:w-4/5">
                <div className=" flex justify-center pointer-events-none mt-4 text-center text-white lg:mt-0 font-bold">
                    TIENDA ABIERTA
                </div>
            </div>
            <div className="flex navbar-menu lg:order-3 lg:w-1/5">
                <Notification />
                <Link className="text-white hover:text-indigo-600 grow" href="#">
                    Cerrar Tienda
                </Link>
                <Link className="text-white hover:text-indigo-600 grow" href="#">
                    Logout
                </Link>
            </div>
        </nav>

    )
};
