import Sidebar from "../../components/Dashboard/Sidebar/sidebar";
import Navbar from "../../components/Dashboard/Navbar/navbar";
import MenuDashboard from "../../components/Dashboard/Layout/menu";
import { fetchProductsOutofStock } from "../utils/actions/products/fetchs";

export default async function Layout({children,}: 
  Readonly<{children: React.ReactNode;}>){

  const productos = await fetchProductsOutofStock(1);

  return (
    <MenuDashboard child={children} products={productos} />
  );
}
