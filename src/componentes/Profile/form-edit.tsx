"use client"

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { UsuarioDetail } from "../../../app/utils/models/types/usuario";
import { myToastError, myToastSuccess } from "../myToast";
import { useEffect, useState } from "react";

export default function FormEditPass({user} : {user: UsuarioDetail}) {
  
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(false);
  }, [loading]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget as HTMLFormElement;
    
    const newPassword = form.newPassword.value;
    const confirmNewPassword = form.confirmNewPassword.value;
    if(newPassword !== confirmNewPassword){
      myToastError("Las nuevas contraseñas no coinciden");
      return;
    }

    const res = await fetch(`/api/usuario/${user.id}`);
    const data = await res.json();
    if (data.status === 500) {
      myToastError(data.error);
      return;
    } else {
      const changepass = await fetch(`/api/usuario/${user.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            password: newPassword,
          })
        });
      const data = await changepass.json();
      myToastSuccess(data.message);
    }


    /* try {
      const res = await fetch(`/api/usuario/${data_user?.[0]?.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },

        federico

         fe 4


        body: JSON.stringify({
          password,
          newPassword
        })
      });
      const data = await res.json();
      alert(data.message);
    } catch (error) {
      alert("Error al cambiar contraseña");
    } */
  }

  if (loading) {
    return (
      <p>loading ...</p>

    )
  }

  return (

      <form className="flex flex-col gap-2 mt-8 px-6" onSubmit={handleSubmit}>
        <Input 
          type="password" 
          id="newPassword"
          name="newPassword"
          placeholder="Nueva contraseña"
          autoComplete="new-password"
          required
        />
        <Input 
          type="password" 
          id="confirmNewPassword"
          name="confirmNewPassword"
          placeholder="Confirmar nueva contraseña"
          autoComplete="new-password"
          required
        />
        <Button className="btn btn-primary" type="submit">
          Cambiar contraseña
        </Button>
        <Button className="btn btn-link" onClick={() => { window.history.back()}}>
          Volver
        </Button>
      </form>
  )
}