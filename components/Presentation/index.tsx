import Link from "next/link";

export default function Presentation() {
    return(
        <>
        <h1>Esto es el Info de presentacion antes de acceder al muestreo de productos ofrecidos</h1>
        <Link href="/salescreen" className="text-white bg-black rounded size-35"> 
            Comprar
        </Link>
        </>
    )    
};
