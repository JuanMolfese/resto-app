"use client"

import { Table, TableBody, TableCaption, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { StatusForm } from "@/componentes/Status/form-create";
import ItemStatus from "@/componentes/Status/item-status";
import { useGetStatusQuery } from "@/redux/services/statusApi";
import Spinner from "@/componentes/spinner";

export default function StatusOrders() {

  const {data: status, error, isLoading, refetch} = useGetStatusQuery();
 
  if (isLoading) return <Spinner />;
  if (error) return <div>Error</div>;

  return (
    <>
      <StatusForm estados={status || []} refetch={refetch}/>
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
            <ItemStatus key={status.id} status={status} refetch={refetch} />
          ))}
        </TableBody>
      </Table>
    </>

  )
}