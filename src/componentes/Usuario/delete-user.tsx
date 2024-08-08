import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { useState } from "react";
import { UsuarioDetail } from "../../../app/utils/models/types/usuario";

import { myToastError, myToastSuccess } from "../myToast";


export default function DeleteUserModal({usuario} : {usuario: UsuarioDetail}){
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleOpen = () => {
    setIsOpen(true);
  }

  const handleClose = () => {
    setIsOpen(false);
  }

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    /* setLoading(true); */
    try {
      const res = await fetch(`/api/usuario/${usuario.id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json", 
        },
        body: JSON.stringify({ user: usuario }),
      });
      if (res.status !== 200) {
        throw new Error("Error al eliminar usuario");
      }
      myToastSuccess("Usuario eliminado correctamente");
      setIsOpen(false);
      window.location.reload();
    } catch (error) {
      myToastError("El usuario no pudo ser eliminado");
    }
    setLoading(false);
  }

  if (loading) return <p>Loading...</p>;

  return (
    <>
      <AlertDialog open={isOpen}>
        <AlertDialogTrigger asChild>
          <Button variant="ghost" size="icon" onClick={handleOpen}>
            <Trash2 color="red" width={20} height={20} />
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Eliminar usuario</AlertDialogTitle>
            <AlertDialogDescription>
              {usuario.email}
            </AlertDialogDescription>
          </AlertDialogHeader>
          
          <AlertDialogDescription className="space-y-2 mb-2">
           ¿Seguro que desea eliminar el usuario?            
          </AlertDialogDescription>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={handleClose}>Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={handleSubmit} className="bg-red-500 hover:bg-red-400">Eliminar</AlertDialogAction>
          </AlertDialogFooter>
         
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}