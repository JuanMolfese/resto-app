import Header from "../components/Header";
import Footer from "../components/Footer";
import Hero from '../components/Hero';
import Presentation from '../components/Presentation';
import { getServerSession } from "next-auth";
import { fetchUserByEmail } from "./utils/actions/users/fetchs";
import { redirect } from "next/navigation";

export default async function Home() {

  const session = await getServerSession();

  /* if (session) {
    const email = session?.user?.email;
    const userData = await fetchUserByEmail(email!);
    const user = userData && userData[0];
    user?.rol_id === 4 ? redirect("/productos") : redirect("/dashboard");
  } else {
    window.location.href = "/login";
  } */


  return (
    <main className="flex min-h-screen flex-col items-center justify-between relative bg-black text-white">
     {/* <Header/>  */}
     <Hero/>   {/* view destacados */}
     {/* <Presentation/> */}  {/* view products */}
     {/* <Footer/> */}
    </main>
  )  
}
