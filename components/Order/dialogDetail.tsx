"use client"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Pedido } from "../../app/utils/models/types/pedido"
import { BadgeDollarSign, HandPlatter, ReceiptText, Truck } from "lucide-react"
import { DialogClose } from "@radix-ui/react-dialog"

export function DialogDetailOrder(order: Pedido) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="p-2"><ReceiptText /></Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Detalle de la Orden</DialogTitle>
          <DialogDescription>
            Orden #{order.id}
          </DialogDescription>
        </DialogHeader>
        <div className="py-4">
          <div className="flex w-full">
            <div className="flex flex-col items-center justify-center">
              {(order.modo_entrega_id === 1) ? <Truck size={40} /> : <HandPlatter size={40} />}
              <p className="text-xs w-20 text-center">{order.modo_entrega_descripcion}</p>
            </div>
            <div className="px-4 py-2 shadow w-full rounded-lg">
              <p className="text-xs md:text-sm">{`${new Date(order.fecha_emision).toLocaleDateString()} - ${new Date(order.fecha_emision).toLocaleTimeString()}`}</p>
              <p className="text-sm md:text-base font-semibold">{order.payer_first_name}</p>
              {
                order.modo_entrega_id === 1 ? <p className="text-xs md:text-sm">{order.payer_address}</p> : null
              }
              {
                order.pago ? 
                  <>
                    <p>{order.payer_last_name}</p>
                    <p>{order.payer_dni}</p>
                    <p>{order.payer_email}</p>
                    <p>{order.payer_phone}</p>
                  </>  
                : null
              }
            </div>
          </div>
          {
            order.pago ? 
              <div className="flex p-2 items-center gap-2">
                <BadgeDollarSign className="rounded-full" size={40} color='green' aria-label='Paga' />
                <p>Pedido pagado</p>
              </div>
            : 
              <div className="flex p-2 items-center gap-2">
                <BadgeDollarSign className="rounded-full" size={40} color='red' aria-label='Impaga' />
                <p>Pedido impago</p>
              </div>
          }
        </div>
        <DialogFooter>
          <DialogClose className="bg-black text-white p-1 md:px-8 rounded-full hover:bg-gray-600">Cerrar</DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
