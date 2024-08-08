"use client"

import FormEditPass from "../../src/componentes/Profile/form-edit";

import { useSession } from "next-auth/react";
import { useGetUserByEmailQuery } from "@/redux/services/usersApi";
import Spinner from "@/componentes/spinner";

export default function Profile() {

  const {data: session} = useSession();
  const {data: userData, isLoading, isError} = useGetUserByEmailQuery(session?.user?.email);

  if (isLoading) return <Spinner />
  if (isError) return <p>Error</p>

  return (
    <div className="p-4">
      <p className="mt-10 scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0">
        Cambio de contraseña
      </p>
      <p className="mt-4 scroll-m-20 text-xl font-semibold tracking-tight">
        Usuario: {userData?.[0]?.email}
      </p>
      <FormEditPass user={userData?.[0]!}/>
    </div>
  )
}