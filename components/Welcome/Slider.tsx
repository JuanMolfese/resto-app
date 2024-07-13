import Image from 'next/image'
import {images} from './images/image'
import { Button } from '@/components/ui/button'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
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
                
                quality={100}
                width={1080}
                height={1920}
                className='w-full h-full object-cover'
                priority
            />          
          </CarouselItem>
        )}
        </CarouselContent>
       
      </Carousel>
      
        <Button
          className='absolute top-48 left-32 rounded-full h-16 bg-green-600'
        >
          <Link href="/productos">
            Ordenar ahora !
          </Link>
        </Button>        
      
    </div>
  )}
          

export default Slider