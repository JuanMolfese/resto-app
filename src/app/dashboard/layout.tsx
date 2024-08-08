"use client";

import { useGetProductsQuery } from "@/redux/services/productsApi";
import MenuDashboard from "@/componentes/Dashboard/Layout/menu";
import { getServerSession } from "next-auth";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { useGetUserByEmailQuery } from "@/redux/services/usersApi";
import Spinner from "@/componentes/spinner";


export default function Layout({children,}: 
  Readonly<{children: React.ReactNode;}>){

  const {data: session} = useSession();
  const {data: productos, isLoading, error} = useGetProductsQuery();
  const {data: userData, isLoading: userLoading, error: userError} = useGetUserByEmailQuery(session?.user?.email);
  
  if (userLoading || isLoading) return <Spinner />;
  if (userError || error) return <div>Error</div>;

  if (session) {
    const email = session?.user?.email;
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
