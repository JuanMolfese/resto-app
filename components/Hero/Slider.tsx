import Image from 'next/image'
import {images} from './images/image'
import { Button } from '@/components/ui/button'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import Autoplay from "embla-carousel-autoplay"
import React from 'react'
import Link from 'next/link'

const Slider = () => {
  const plugin = React.useRef(
    Autoplay({ delay: 5000, stopOnInteraction: true })
  )
  return (
    <div className="w-full min-h-screen mx-auto">
      <Carousel plugins={[plugin.current]}
      onMouseEnter={plugin.current.stop}
      onMouseLeave={plugin.current.reset}>

        <CarouselContent>
          {images.map((pic, index) => 
          <CarouselItem key={index}>
            <Image 
                src={pic.src}
                alt={pic.alt}
                /* layout='fill' */
                quality={100}
                width={1080}
                height={1920}
                className='w-full h-full object-cover'
                priority
            />          
          </CarouselItem>
        )}
        </CarouselContent>
       {/*  <CarouselPrevious />
        <CarouselNext /> */}
      </Carousel>
      
        <Button variant="destructive"
          className='absolute bottom-3 left-5 animate-bounce rounded-full h-14'
        >
          <Link href="/productos">
            Ordenar ahora !
          </Link>
        </Button>        
      
    </div>
  )}
          
{/*           'block w-full h-[80vh] object-cover transition-all duration-500 ease-in-out'
          : "hidden" */}

export default Slider