"use client"
import { Badge } from "@/components/ui/badge";
import { fetchStatus } from "../../utils/actions/pedidos/status/fetchs"
import Link from "next/link";
import { useGetPedidosQuery } from "@/redux/services/ordersApi";
import { BadgeDollarSign, HandPlatter, Receipt, ReceiptText, Truck } from "lucide-react";
import { Pedido } from "../../utils/models/types/pedido";
import { DialogDetailOrder } from "../../../components/Order/dialogDetail";


const orderTakeaway = (order: Pedido) => {
  return (
    <>
      <HandPlatter size={40} />
      <div className="grow px-4 flex items-center">
        <p className="my-auto hidden md:block w-20">{order.modo_entrega_descripcion}</p>
        <div className="grow">
          <p className="text-sm md:text-base font-semibold">{order.payer_first_name}</p>
        </div>
        <p className="text-xs md:text-sm ">{order.estado_pedido_descripcion}</p>
      </div>
      {
        <BadgeDollarSign className={`p-2 rounded-full`} size={40} color={`${order.pago ? 'green' : 'red'}`} aria-label={`${order.pago ? 'Paga' : 'Impaga'}`}/>
      }
    </>
  )
}

const orderDelivery = (order: Pedido) => {
  return (
    <>
      <Truck size={40} />
      <div className="grow px-4 flex items-center">
        <p className="my-auto hidden md:block w-20">{order.modo_entrega_descripcion}</p>
        <div className="grow">
          <p className="text-sm md:text-base font-semibold">{order.payer_first_name}</p>
          <p className="text-xs md:text-sm max-w-24 md:max-w-48 overflow-hidden overflow-ellipsis whitespace-nowrap">{order.payer_address}</p>
        </div>
        <p className="text-xs md:text-sm">{order.estado_pedido_descripcion}</p>
      </div>
      {
        <BadgeDollarSign className={`p-2 rounded-full`} size={40} color={`${order.pago ? 'green' : 'red'}`} aria-label={`${order.pago ? 'Paga' : 'Impaga'}`}/>
      }
      <div className="hidden md:block">
      {
        order.pago ? <p>{order.mp_id}</p> : null
      }
      </div>
    </>
  )
}

export default function Orders() {

  
  const { data: pedidos, error, isLoading } = useGetPedidosQuery();

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error</p>;

  return(
    <>
      {/* <div className="flex">
        {status?.map((status) => (
          <Link key={status.id} href={`/dashboard/orders/${status.id}`}>
            <Badge key={status.id} variant="outline" className="mr-2">
              {status.descripcion}
            </Badge>
          </Link>
        ))}
      </div> */}
      <div>
        
        {pedidos?.length === 0 && <p>No hay pedidos</p>}
        <ul>
          {pedidos?.map((order) => (
            <li key={order.id} className="flex w-full justify-between items-center p-4 bg-slate-200/20 my-2 rounded-full shadow shadow-slate-400/20 hover:bg-slate-100">    
              {
                (order.modo_entrega_id == 1) ? orderDelivery(order) : orderTakeaway(order)
              }
              <DialogDetailOrder {...order} />
            </li>
          ))}
        </ul>
        
      </div>
    </>
  )
};
