import { toast } from "@/components/ui/use-toast";

export function myToastError(msg: string) {
  const mytoast = toast({
    title: 'Error',
    description: msg,
    variant: "destructive",
  })
  setTimeout(() => {
    mytoast.dismiss();
  }, 3000);

  return mytoast;
}

export function myToastSuccess(message: string) {
  const mytoast = toast({
    title: 'Correcto',
    description: message,
  })
  setTimeout(() => {
    mytoast.dismiss();
  }, 3000);

  return mytoast;
}