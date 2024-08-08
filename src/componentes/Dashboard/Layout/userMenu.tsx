"use client"
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { signOut, useSession } from "next-auth/react";
import {  CircleUser, LogOut, RectangleEllipsis } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { useGetSucursalQuery, useUpdateSucursalMutation } from "@/redux/services/sucursalApi";
import Spinner from "../../spinner";
import { myToastError, myToastSuccess } from "../../myToast";
import { useRouter } from "next/navigation";

export default function UserMenu() {

  const user = useSession();
  const { data: sucursal, error: errorSucursal, isLoading: isLoadingSucursal, refetch } = useGetSucursalQuery();
  const [updateSucursal] = useUpdateSucursalMutation();
  const [estado, setEstado] = useState(true);
  const router = useRouter();
  
  useEffect(() => {
    if (!user) {
      window.location.href = '/login';
    }
  }, [user]);

  useEffect(() => {
    setEstado(sucursal?.status_sucursal_id == 1);
  }, [sucursal]);
  
  if (isLoadingSucursal) return <p>Cargando ...</p>

  const handleChange = () => {
    refetch();
    const status = estado ? 2 : 1;
    try {
      updateSucursal({status: status, id: 1}).then((res: any) => {
        (res.data.status === 200) ? (
          setEstado(!estado),
          myToastSuccess(estado ? 'La sucursal ha sido cerrada, hasta mañana' : 'Buenos días, la sucursal ha sido abierta')
        )
        : myToastError("Error al cerrar la sucursal, intente nuevamente"); 
      });
    } catch (error) {
      console.error
    }
    
  }

  return (
    <div className="mt-1 flex flex-row">
      <div className="flex items-center space-x-2 mr-4">
        <Switch id="status-local" onCheckedChange={handleChange} checked={estado}/>
        <Label htmlFor="status-local">
          {
            estado ?
            "Cerrar local" : "Abrir local"
          }
        </Label>

      </div>
      <DropdownMenu>
        
        <DropdownMenuTrigger asChild>
          <Button variant="secondary" size="icon" className="rounded-full hover:bg-gray-200">
            <CircleUser className="h-5 w-5" />
            <span className="sr-only">User menu</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>{user?.data?.user?.email}</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem className="cursor-pointer">
            <Link href="/profile" className="flex">
              <RectangleEllipsis className="sm mr-1"/>
              Editar contraseña
            </Link>
          </DropdownMenuItem>
        {/*  <DropdownMenuItem>Support</DropdownMenuItem> */}
          <DropdownMenuSeparator />
          <DropdownMenuItem className="cursor-pointer" onClick={() => signOut()}>
            <LogOut className="sm mr-1"/>
            Salir
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}