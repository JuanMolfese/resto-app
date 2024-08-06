"use client"

import { Table, TableBody, TableCaption, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { StatusForm } from "../../../../components/Status/form-create";
import ItemStatus from "../../../../components/Status/item-status";
import { useGetStatusQuery } from "@/redux/services/statusApi";

export default async function StatusOrders() {

  const {data: status, error, isLoading} = useGetStatusQuery(1);

  return (
    <>
      <StatusForm estados={status}/>
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
          {status?.map((status: any) => (
            <ItemStatus key={status.id} status={status} />
          ))}
        </TableBody>
      </Table>
    </>

  )
}