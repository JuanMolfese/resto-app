"use client"

import { TableCell, TableRow } from "@/components/ui/table";
import { Estado_pedido } from "../../../app/utils/models/types/estado_pedido";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { myToastError, myToastSuccess } from "../myToast";
import { useDeleteStatusMutation } from "@/redux/services/statusApi";
import { useRouter } from "next/navigation";

export default function ItemStatus({status, refetch } : {status: Estado_pedido, refetch: any}){

  const [deleteStatus] = useDeleteStatusMutation();
  const router = useRouter();

  const handleDelete = async (e: any) => {
    e.preventDefault();  
    const id = status.id;         
    deleteStatus(id).then((res: any) => {
      if(res.error){       
        myToastError("Error al eliminar el estado");
      } else {
        myToastSuccess("Estado eliminado");
        refetch();
        router.push("/dashboard/orders/status");
        router.refresh();
      }
    });
  }; 

  return (
    <TableRow key={status.id}>
      <TableCell>{status.id}</TableCell>
      <TableCell>{status.descripcion}</TableCell>
      <TableCell>{status.orden}</TableCell>
      <TableCell className="text-right">
        <Button variant="ghost" onClick={handleDelete} >
          <Trash2 color="red" />
        </Button>
      </TableCell>
    </TableRow>
  )
}