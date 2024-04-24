import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Pencil, RectangleEllipsis, Trash2 } from "lucide-react";
import { useState } from "react";
import { UsuarioDetail } from "../../app/utils/models/types/usuario";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";
import { myToastError, myToastSuccess } from "../myToast";
import { getServerSession } from "next-auth";

export default function DeleteUserModal({usuario} : {usuario: UsuarioDetail}){
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

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
      myToastSuccess("Usuario eliminado correctamente");
    } catch (error) {
      myToastError("El usuario no pudo ser eliminado");
    }
    setLoading(false);
  }

  if (loading) return <p>Loading...</p>;

  return (
    <>
      {/* <Modal isOpen={isOpen} onClose={handleClose}>
        <ModalHeader>Editar contraseña de {usuario.email}</ModalHeader>
        <ModalBody>
          <Input 
            type="password" 
            label="Nueva contraseña" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
          />
          <Input 
            type="password" 
            label="Confirmar contraseña" 
            value={passwordConfirm} 
            onChange={(e) => setPasswordConfirm(e.target.value)} 
          />
          {error && <Text color="red">{error}</Text>}
        </ModalBody>
        <ModalFooter>
          <Button onClick={handleClose}>Cancelar</Button>
          <Button onClick={handleSubmit} loading={loading}>Guardar</Button>
        </ModalFooter>
      </Modal> */}

      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button variant="ghost" size="icon">
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
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={handleSubmit} className="bg-red-500 hover:bg-red-400">Eliminar</AlertDialogAction>
          </AlertDialogFooter>
         
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}