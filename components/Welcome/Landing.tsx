import Image from 'next/image';
import Link from 'next/link';

export default function Landing() {
  return (
    <div className="relative h-screen w-full bg-cover bg-center" style={{ backgroundImage: "url('/pizza_wall.jpg')" }}>
      <div className="h-full bg-black bg-opacity-50">
        <div className='flex flex-col justify-center items-center w-full h-screen'>
          <div className="w-full md:w-3/4 lg:w-2/4 ml-auto flex flex-col items-center animate-fade-in">
            <Image src="/LogoPizza3_high.png" alt="Logotipo" width={400} height={200} className="mb-8" priority/>
            <div className="animate-slide-in-up">
              <Link href="/productos">
                <button className="bg-green-500 text-white px-8 py-6 rounded-lg shadow-lg hover:bg-green-700 transition duration-300 ease-in-out">
                  Ordenar
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
