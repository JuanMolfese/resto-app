"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import createState from "../../app/utils/actions/pedidos/status/create"
import { toast } from "@/components/ui/use-toast"
import { myToastError } from "../myToast"
import { Estado_pedido } from "../../app/utils/models/types/estado_pedido"

const formSchema = z.object({
  name: z.string().min(3, {
    message: "El nombre no puede tener menos de 3 caracteres",
  }),
  orden: z.number().int().min(1).positive({
    message: "La orden debe ser un número positivo",
  }),
})



export function StatusForm({estados}: {estados: Estado_pedido[]}) {

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      order: 0,
    },
  });

  const submit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const newFormData = new FormData(event.currentTarget);
    const newOrden = newFormData.get('order');
    if (estados.some(estado => estado.orden = newOrden)) {
      myToastError("Ya existe un estado con ese nombre");
      return;
    }
    const res = await createState(newFormData);
    if (res.success) {
      window.location.reload();
    } else {
      myToastError("Error al crear el estado");
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={submit} className="flex justify-around max-w-sm">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nombre</FormLabel>
              <FormControl>
                <Input placeholder="Nombre" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="order"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Orden</FormLabel>
              <FormControl>
                <Input placeholder="1" {...field} max={10} className="max-w-12" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="mt-auto">Agregar</Button>
      </form>
    </Form>
  )
}
