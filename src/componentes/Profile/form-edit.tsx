"use client"

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Usuario } from "../../app/utils/models/types/usuario";
import { myToastError, myToastSuccess } from "../myToast";
import { useEffect, useState } from "react";

export default function FormEditPass({user} : {user: Usuario}) {
  
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