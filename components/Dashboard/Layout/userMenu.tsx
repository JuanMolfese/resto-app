import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { signOut } from "next-auth/react";
import {  CircleUser, LogOut, RectangleEllipsis } from "lucide-react";
import Link from "next/link";

export default function UserMenu({user}: {user: any}) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="secondary" size="icon" className="rounded-full hover:bg-gray-200">
          <CircleUser className="h-5 w-5" />
          <span className="sr-only">User menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>{user}</DropdownMenuLabel>
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
  )
}