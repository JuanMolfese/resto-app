import Image from 'next/image';
import { images } from './images/image';
import { Button } from '@/components/ui/button';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import React from 'react';
import Link from 'next/link';

const Slider = () => {
  const plugin = React.useRef(
    Autoplay({ delay: 5000, stopOnInteraction: true })
  );

  return (
    <div className="relative w-full min-h-screen">
      <Carousel
        plugins={[plugin.current]}
        /* onMouseEnter={plugin.current.stop}
        onMouseLeave={plugin.current.reset} */
      >
        <CarouselContent className="w-full h-screen">
          {images.map((pic, index) => (
            <CarouselItem key={index} className="w-full h-screen relative">
              <div className="absolute inset-0 w-full h-full">
                <Image
                  src={pic.src}
                  alt={pic.alt}             
                  quality={100}                 
                  fill
                  sizes='width: 100vh'
                  priority
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>

      <div className="absolute inset-0 flex flex-col justify-center items-center z-10 bg-green-950 bg-opacity-30">
        <div className="animate-bounce">
          <Image
            src="/LogoPizza3_high.png"
            alt="Logotipo"
            width={300}
            height={150}
            className="mb-8"
            priority
          />
        </div>
        <div className="animate-slide-in-up mb-20">
          <Link href="/productos">
            <Button className="bg-green-600 text-white font-bold text-xl border-spacing-2 border-solid border-2 border-green-400 tracking-widest px-8 py-6 rounded-xl shadow-lg hover:bg-green-700 transition duration-300 ease-in-out md:px-8 md:py-6">
              Ordenar
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Slider;
