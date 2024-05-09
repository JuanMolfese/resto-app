import Sidebar from "../../components/Dashboard/Sidebar/sidebar";
import Navbar from "../../components/Dashboard/Navbar/navbar";
import MenuDashboard from "../../components/Dashboard/Layout/menu";
import { fetchProductsOutofStock } from "../utils/actions/products/fetchs";
import { getServerSession } from "next-auth";
import { fetchUserByEmail } from "../utils/actions/users/fetchs";
import { redirect } from "next/navigation";


export default async function Layout({children,}: 
  Readonly<{children: React.ReactNode;}>){

  const productos = await fetchProductsOutofStock(1);
  const session = await getServerSession();
  if (session) {
    const email = session?.user?.email;
    const userData = await fetchUserByEmail(email!);
    const user = userData && userData[0];
    user?.descripcion == 'Client' && redirect("/productos");
  } else {
    // Redirect to the login page
    window.location.href = "/login";
  }

  return (
    <MenuDashboard child={children} products={productos}/>
  );
}
