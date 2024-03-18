import Header from "../components/Header";
import Footer from "../components/Footer";
import Hero from '../components/Hero';
import Presentation from '../components/Presentation';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
     <Header/> 
     <Hero/>   {/* view destacados */}
     <Presentation/>  {/* view products */}
     <Footer/>
    </main>
  )  
}
