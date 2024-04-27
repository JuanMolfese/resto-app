"use client"

import { TableCell, TableRow } from "@/components/ui/table";
import { UsuarioDetail } from "../../app/utils/models/types/usuario";
import EditPasswordModal from "./edit-pass";
import DeleteUserModal from "./delete-user";

export default function ItemUser({usuario, user} : {usuario: UsuarioDetail, user: any}){

  return (
    <>
      <TableRow key={usuario.id}>
        <TableCell>{usuario.email}</TableCell>
       {/*  <TableCell>{usuario.nombre}</TableCell>
        <TableCell>{usuario.apellido}</TableCell> */}
        <TableCell className="text-start">{usuario.descripcion}</TableCell>
        {
        <TableCell className="text-right">
          {usuario.descripcion != "Super Admin" && user.id != usuario.id &&
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