import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { RectangleEllipsis } from "lucide-react";
import { useState } from "react";
import { UsuarioDetail } from "../../../app/utils/models/types/usuario";
import { Input } from "@/components/ui/input";
import { myToastSuccess } from "../myToast";

export default function EditPasswordModal({usuario} : {usuario: UsuarioDetail}){
  const [isOpen, setIsOpen] = useState(false);
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleOpen = () => {
    setIsOpen(true);
  }

  const handleClose = () => {
    setIsOpen(false);
  }

  const resetForm = () => {
    setPassword("");
    setPasswordConfirm("");
    setError("");
  }

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (password == "" || passwordConfirm == ""){
      setError("Complete los campos");
      return;
    }
    if(password !== passwordConfirm){
      setError("Las contraseñas no coinciden");
      return;
    } else {
      setError("");

    }

    /* setLoading(true); */
    const res = await fetch(`/api/usuario/${usuario.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ password }),
    });

    if(res.ok){
      setPassword("");
      setPasswordConfirm("");
      setError("");
      setIsOpen(false);
      myToastSuccess("Contraseña cambiada correctamente");
    } else {
      setError("Ocurrió un error. Intente nuevamente");
    }
    setLoading(false);
  }

  if (loading) return <p>Loading...</p>;

  return (
    <>

      <AlertDialog open={isOpen}>
        <AlertDialogTrigger asChild>
          <Button variant="ghost" size="icon" onClick={handleOpen}>
            <RectangleEllipsis width={20} height={20}/>
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Cambio de contraseña</AlertDialogTitle>
            <AlertDialogDescription>
              {usuario.email}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <form>
          <AlertDialogDescription className="space-y-2 mb-2">
            <Input 
              type="password" 
              value={password} 
              placeholder="Nueva contraseña"
              onChange={(e) => setPassword(e.target.value)} 
              onFocus={resetForm}
            />
            <Input 
              type="password"   
              placeholder="Confirmar contraseña"
              value={passwordConfirm} 
              onChange={(e) => setPasswordConfirm(e.target.value)} 
            />
            {error && <p color="red">{error}</p>}
            
          </AlertDialogDescription>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={handleClose}>Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={handleSubmit}>Cambiar</AlertDialogAction>
          </AlertDialogFooter>
          </form>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}