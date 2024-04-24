"use client"

import { TableCell, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Pencil, RectangleEllipsis, Trash2 } from "lucide-react";
import { UsuarioDetail } from "../../app/utils/models/types/usuario";
import EditPasswordModal from "./edit-pass";
import DeleteUserModal from "./delete-user";

export default function ItemUser({usuario} : {usuario: UsuarioDetail}){


  return (
    <>
      <TableRow key={usuario.id}>
        <TableCell>{usuario.email}</TableCell>
        <TableCell>{usuario.nombre}</TableCell>
        <TableCell>{usuario.apellido}</TableCell>
        <TableCell>{usuario.descripcion}</TableCell>
        <TableCell className="text-right">
          {/* <Button variant="ghost" size="icon">
            <RectangleEllipsis width={20} height={20}/>
          </Button> */}
          <EditPasswordModal usuario={usuario} />
         {/*  <Button variant="ghost" size="icon">
            <Pencil color="green" width={20} height={20}/>
          </Button> */}
          {/* <Button variant="ghost" size="icon">
            <Trash2 color="red" width={20} height={20} />
          </Button> */}
          <DeleteUserModal usuario={usuario} />
        </TableCell>
      </TableRow>
    </>
  )
}