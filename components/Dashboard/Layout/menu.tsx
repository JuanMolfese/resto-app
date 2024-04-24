"use client";
import Link from "next/link";
import {
  Chrome,
  CircleUser,
  Home,
  LineChart,
  Menu,
  Package,
  Package2,
  Search,
  ShoppingCart,
  Users,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useState } from "react";
import Image from "next/image";
import { signOut, useSession } from "next-auth/react";
import UserMenu from "./userMenu";

export default function MenuDashboard({
  child,
  products,
}: {
  child: any;
  products: any;
}) {
  const [activeLink, setActiveLink] = useState(null);

  const handleClick = (name: any) => {
    setActiveLink(name);
    /* Close sheet */
  };

  const linkStyle = (name: any) => {
    return activeLink === name
      ? "flex items-center bg-muted gap-3 rounded-lg px-3 py-2 text-primary transition-all hover:text-primary"
      : "flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary";
  };

  return (
    <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      <div className="hidden border-r bg-muted/40 md:block">
        <div className="flex h-full max-h-screen flex-col gap-2">
          <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
            <Link
              href="/dashboard"
              className="flex items-center gap-2 font-semibold"
            >
              <Image src="/balcon-icon.png" alt="logo" width={80} height={80} priority/>
              <span className="">El Balcon</span>
            </Link>
          </div>
          <div className="flex-1">
            <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
              <Link
                href="/dashboard"
                className={linkStyle("inicio")}
                onClick={() => handleClick("inicio")}
              >
                <Home className="h-4 w-4" />
                Inicio
              </Link>
              <div>
                <Link
                  href="/dashboard/orders"
                  className={linkStyle("pedidos")}
                  onClick={() => handleClick("pedidos")}
                >
                  <ShoppingCart className="h-4 w-4" />
                  Pedidos
                  <Badge className="ml-auto flex h-6 w-6 shrink-0 items-center justify-center rounded-full">
                    6
                  </Badge>
                </Link>
                <Link
                  href="/dashboard/orders/status"
                  className={`${linkStyle("status")} text-base ml-2 lg:text-sm`}
                  onClick={() => handleClick("status")}
                >
                  <Package2 className="h-4 w-4" />
                  Administrar estados
                </Link>
              </div>
              <div>
                <Link
                  href={
                    products && products.length > 0
                      ? "/dashboard/products?ms=true"
                      : "/dashboard/products"
                  }
                  className={linkStyle("productos")}
                  onClick={() => handleClick("productos")}
                >
                  <Package className="h-4 w-4" />
                  Productos
                  {products && products.length > 0 && (
                    <Badge
                      variant={"destructive"}
                      className="ml-auto flex h-6 w-6 shrink-0 items-center justify-center rounded-full"
                    >
                      {products.length}
                    </Badge>
                  )}
                </Link>
                <Link
                  href="/dashboard/rubros"
                  className={`${linkStyle("rubros")} text-base ml-2 lg:text-sm`}
                  onClick={() => handleClick("rubros")}
                >
                  <Package2 className="h-4 w-4" />
                  Administrar Rubros
                </Link>
                <Link
                  href="/dashboard/subrubros"
                  className={`${linkStyle("subrubros")} text-base ml-2 lg:text-sm`}
                  onClick={() => handleClick("subrubros")}
                >
                  <Package2 className="h-4 w-4" />
                  Administrar Sub Rubros
                </Link>
              </div>
              <Link
                href="/dashboard/users"
                className={linkStyle("usuarios")}
                onClick={() => handleClick("usuarios")}
              >
                <Users className="h-4 w-4" />
                Usuarios
              </Link>
              {/* <Link
                href="#"
                className={linkStyle("reportes")}
                onClick={() => handleClick("reportes")}
              >
                <LineChart className="h-4 w-4" />
                Analytics
              </Link> */}
              <Link
                href="/productos"
                target="_blank"
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
              >
                <Chrome className="h-4 w-4" />
                Web Compras
              </Link>
            </nav>
          </div>
        </div>
      </div>
      <div className="flex flex-col">
        <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="shrink-0 md:hidden"
              >
                <Menu className="h-5 w-5" />
                <span className="sr-only">Navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="flex flex-col">
              <nav className="grid gap-2 text-lg font-medium">
                <SheetClose asChild>
                  <Link
                    href="/dashboard"
                    className={linkStyle("inicio")}
                    onClick={() => handleClick("inicio")}
                  >
                    <Home className="h-4 w-4" />
                    Inicio
                  </Link>
                </SheetClose>
                <SheetClose asChild>
                 
                    <Link
                      href="/dashboard/orders"
                      className={linkStyle("pedidos")}
                      onClick={() => handleClick("pedidos")}
                    >
                      <ShoppingCart className="h-4 w-4" />
                      Pedidos
                      <Badge className="ml-auto flex h-6 w-6 shrink-0 items-center justify-center rounded-full">
                        6
                      </Badge>
                    </Link>
                    </SheetClose>
                    <SheetClose asChild>
                    <Link
                      href="/dashboard/orders/status"
                      className={`${linkStyle(
                        "status"
                      )} text-base ml-2 lg:text-sm`}
                      onClick={() => handleClick("status")}
                    >
                      <Package2 className="h-4 w-4" />
                      Administrar estados
                    </Link>
                  
                </SheetClose>
                <SheetClose asChild>
                  <Link
                    href={
                      products && products.length > 0
                        ? "/dashboard/products?ms=true"
                        : "/dashboard/products"
                    }
                    className={linkStyle("productos")}
                    onClick={() => handleClick("productos")}
                  >
                    <Package className="h-4 w-4" />
                    Productos
                    {products && products.length > 0 && (
                      <Badge
                        variant={"destructive"}
                        className="ml-auto flex h-6 w-6 shrink-0 items-center justify-center rounded-full"
                      >
                        {products.length}
                      </Badge>
                    )}
                  </Link>
                </SheetClose>
                <SheetClose asChild>
                  <Link
                    href="/dashboard/users"
                    className={linkStyle("usuarios")}
                    onClick={() => handleClick("usuarios")}
                  >
                    <Users className="h-4 w-4" />
                    Usuarios
                  </Link>
                </SheetClose>
                {/* <SheetClose asChild>
                  <Link
                    href="#"
                    className={linkStyle("reportes")}
                    onClick={() => handleClick("reportes")}
                  >
                    <LineChart className="h-4 w-4" />
                    Analytics
                  </Link>
                </SheetClose> */}
                <SheetClose asChild>
                  <Link
                    href="/productos"
                    target="_blank"
                    className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
                  >
                    <Chrome className="h-4 w-4" />
                    Web Compras
                  </Link>
                </SheetClose>
              </nav>
            </SheetContent>
          </Sheet>
          <div className="w-full flex-1">
            <form>
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search products..."
                  className="w-full appearance-none bg-background pl-8 shadow-none md:w-2/3 lg:w-1/3"
                />
              </div>
            </form>
          </div>
          <UserMenu />
        </header>
        <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-2">
          {child}
        </main>
      </div>
    </div>
  );
}
