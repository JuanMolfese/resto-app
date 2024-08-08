"use client";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { useGetPedidosQuery, useUpdatePedidoMutation } from "@/redux/services/ordersApi";
import {
  BadgeDollarSign,
  HandPlatter,
  Truck,
} from "lucide-react";
import { Pedido } from "../../utils/models/types/pedido";
import { DialogDetailOrder } from "../../../components/Order/dialogDetail";
import { useGetStatusQuery } from "@/redux/services/statusApi";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import io from "socket.io-client";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { myToastError, myToastSuccess } from "../../../components/myToast";
import Spinner from "../../../components/spinner";

const orderDelivery = (order: Pedido) => {
  return (
    <>
      <div className="hidden md:block">
        {order.pago ? <p>{order.mp_id}</p> : null}
      </div>
    </>
  );
};

const socket = io("http://localhost:3000");

export default function Orders() {
  const { data: pedidos, error, isLoading, refetch } = useGetPedidosQuery();
  const [updatePedido] = useUpdatePedidoMutation();

  const {
    data: status,
    error: errorStatus,
    isLoading: isLoadingStatus,
  } = useGetStatusQuery();

  const params = useSearchParams();
  const filter = params.get("filter");

  const filteredOrders = pedidos?.filter((pedido: any) => {
    return (
      !filter ||
      pedido.estado_pedido_descripcion
        .toLowerCase()
        .includes(filter.toLowerCase())
    );
  });


  const handleChange = (value: number, order: number) => {
    updatePedido({value, order}).then((res: any) => {
       
      if (res.data.status === 200) {
        <Spinner />
        location.reload();
      } 
      else myToastError("Error al actualizar el estado del pedido. Espere por favor"); 
    });

      
  };

  if (isLoading || isLoadingStatus) return <Spinner />;
  if (error || errorStatus) return <p>Error</p>;

  return (
    <>
      <div className="flex">
        {status?.map((status: any) => (
          <Link
            key={status.id}
            href={`/dashboard/orders?filter=${status.descripcion}`}
          >
            <Badge
              key={status.id}
              variant="outline"
              className={`mr-2 ${
                status.descripcion == filter ? "bg-green-200" : "bg-slate-100"
              }`}
            >
              {status.descripcion}
            </Badge>
          </Link>
        ))}
        <Link href="/dashboard/orders">
          <Badge
            variant="outline"
            className={`mr-2 ${!filter ? "bg-green-200" : "bg-slate-100"}`}
          >
            Todos
          </Badge>
        </Link>
      </div>
      <div>
        {filteredOrders?.length === 0 && <p>No hay pedidos</p>}
        <ul>
          {filteredOrders?.map((order: any) => (
            <li
              key={order.id}
              className="flex w-full justify-between items-center p-4 bg-slate-200/20 my-2 rounded-full shadow shadow-slate-400/20 hover:bg-slate-100"
            >
              {order.modo_entrega_id == 1 ? (
                <Truck size={40} />
              ) : (
                <HandPlatter size={40} />
              )}
              <div className="grow px-4 flex items-center">
                <p className="my-auto hidden md:block w-20">
                  {order.modo_entrega_descripcion}
                </p>
                <div className="grow">
                  <p className="text-sm md:text-base font-semibold">
                    {order.payer_first_name}
                  </p>
                </div>
                {/* <p className="text-xs md:text-sm ">{order.estado_pedido_descripcion}</p> */}
                <Select onValueChange={(value) => handleChange(parseInt(value), order.id)}>
                  <SelectTrigger className="w-32 text-xs">
                    <SelectValue
                      placeholder={order.estado_pedido_descripcion}
                    />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel className="color-slate-100 text-xs font-normal">
                        Estados
                      </SelectLabel>
                      {status?.map((status: any) => {
                        return (
                          <SelectItem
                            key={status.id}
                            value={status.id.toString()}
                          >
                            {status.descripcion}
                          </SelectItem>
                        );
                      })}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
              {
                <BadgeDollarSign
                  className={`p-2 rounded-full`}
                  size={40}
                  color={`${order.pago ? "green" : "red"}`}
                  aria-label={`${order.pago ? "Paga" : "Impaga"}`}
                />
              }
              <DialogDetailOrder {...order} />
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
