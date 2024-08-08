"use client"

import { TableCell, TableRow } from "@/components/ui/table";
import EditPasswordModal from "./edit-pass";
import DeleteUserModal from "./delete-user";
import { useState } from "react";
import { Pencil, Save, X } from "lucide-react";
import { Rol } from "../../app/utils/models/types/rol";
import { Usuario } from "../../app/utils/models/types/usuario";
import { myToastError, myToastSuccess } from "../myToast";
import { useSession } from "next-auth/react";

export default function ItemUser({usuario, roles} : {usuario: Usuario, roles: Rol[]}){

  const { data: session } = useSession();

  const [editMode, setEditMode] = useState(false);
  const saveUser = async () => {
    try {
      const newRol = (document.getElementById('newRol') as HTMLSelectElement).value;
      const res = await fetch(`/api/usuario/${usuario.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          id_rol: newRol
        })
      });
      const data = await res.json();
      myToastSuccess(data.message);
      window.location.reload();
    } catch (error) {
      myToastError("Error al actualizar usuario");
    }
    setEditMode(false);
  }

  return (
    <>
      <TableRow key={usuario.id}>
        <TableCell>{usuario.email}</TableCell>
       {/*  <TableCell>{usuario.nombre}</TableCell>
        <TableCell>{usuario.apellido}</TableCell> */}
        <TableCell className="text-start max-w-24">
          {
            editMode ? 
              <div className="flex align-center justify-between">
                <select name="newRol" id="newRol" className="p-1 rounded-md" defaultValue={usuario.descripcion}>
                  {roles.map((rol: any) => (
                    <option key={rol.id} value={rol.id}>{rol.descripcion}</option>
                  ))}
                </select>
                <button type="button" className="btn btn-primary" onClick={saveUser}>
                  <Save size={16} className="ml-0.5"/>
                </button>
                <button className="btn btn-link" onClick={() => setEditMode(false)}>
                  <X size={16} className="ml-0.5" />
                </button>
              </div>
            : 
              <div className="flex align-center justify-between">
                {usuario.descripcion}
                {usuario.descripcion != "Super Admin" && session?.user?.email != usuario.email &&
                  <button className="btn btn-link" onClick={() => setEditMode(true)}>
                    <Pencil size={16} className="ml-0.5"/>
                  </button>
                }
              </div>
          }
        </TableCell>
        {
        <TableCell className="text-right">
          {usuario.descripcion != "Super Admin" && session?.user?.email != usuario.email &&
            <>
              <EditPasswordModal usuario={usuario} />
              <DeleteUserModal usuario={usuario} />
            </>
          }
        </TableCell>
        }
      </TableRow>
    </>
  )
}