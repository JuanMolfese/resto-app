import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { fetchStatus } from "../../../utils/actions/pedidos/status/fetchs";
import { Button } from "@/components/ui/button";
import { StatusForm } from "../../../../components/Status/form-create";
import { Trash2 } from "lucide-react";
import ItemStatus from "../../../../components/Status/item-status";

export default async function StatusOrders() {

  const status = await fetchStatus();

  return (
    <>
      <StatusForm estados={status || []}/>
      <Table>
        <TableCaption className="caption-top mb-4">Listado de los estados de un pedido</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Id</TableHead>
            <TableHead>Estado</TableHead>
            <TableHead className="w-[100px]">Orden</TableHead>
            <TableHead className="text-right">Acciones</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {status?.map((status) => (
            <ItemStatus key={status.id} status={status} />
          ))}
        </TableBody>
      </Table>
    </>

  )
}