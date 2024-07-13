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
    <div className="relative w-full min-h-screen mx-auto">
      <Carousel
        plugins={[plugin.current]}
        onMouseEnter={plugin.current.stop}
        onMouseLeave={plugin.current.reset}
      >
        <CarouselContent className="w-full h-screen relative">
          {images.map((pic, index) => (
            <CarouselItem key={index} className="w-full h-screen relative">
              <Image
                src={pic.src}
                alt={pic.alt}
                quality={100}
                layout="fill" // This makes the image fill its container
                objectFit="cover" // This ensures the image covers the container without stretching
                className="w-full h-full object-cover"
                priority
              />
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>

      <div className="absolute inset-0 flex flex-col justify-center items-center z-10 bg-black bg-opacity-50">
        <div className="animate-bounce">
          <Image
            src="/LogoPizza3_high.png"
            alt="Logotipo"
            width={300}
            height={150}
            className="mb-8 md:w-400 md:h-200 lg:w-400 lg:h-200"
            priority
          />
        </div>
        <div className="animate-slide-in-up">
          <Link href="/productos">
            <Button className="bg-green-500 text-white px-6 py-4 rounded-lg shadow-lg hover:bg-green-700 transition duration-300 ease-in-out md:px-8 md:py-6">
              Ordenar
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Slider;
