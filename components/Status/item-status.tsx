"use client"

import { TableCell, TableRow } from "@/components/ui/table";
import { Estado_pedido } from "../../app/utils/models/types/estado_pedido";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import deleteStatus from "../../app/utils/actions/pedidos/status/delete";
import { toast } from "@/components/ui/use-toast";
import { myToastError } from "../myToast";

export default function ItemStatus({status} : {status: Estado_pedido}){

  const handleDelete = async (e: any) => {
    e.preventDefault();
    try {
      const res = await deleteStatus(status.id);
      if (res.success) {
        window.location.reload();
      }
    } catch (error) {
      myToastError("El estado no puede ser eliminado")
    }
  }

  return (
    <TableRow key={status.id}>
      <TableCell>{status.id}</TableCell>
      <TableCell>{status.descripcion}</TableCell>
      <TableCell>{status.orden}</TableCell>
      <TableCell className="text-right">
        <Button variant="link" onClick={handleDelete}>
          <Trash2 />
        </Button>
      </TableCell>
    </TableRow>
  )
}