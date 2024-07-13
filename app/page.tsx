import { getServerSession } from "next-auth";
import { fetchUserByEmail } from "./utils/actions/users/fetchs";
import { redirect } from "next/navigation";
import Welcome from "../components/Welcome"

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
    <Welcome/>            
  )  
}
{/* main className="flex min-h-screen flex-col items-center justify-between relative bg-white text-white"> */}    

