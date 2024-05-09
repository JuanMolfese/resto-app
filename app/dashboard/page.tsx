import { Card, CardContent, CardHeader } from "@/components/ui/card";
import Link from "next/link";

import { Chrome, Package, ShoppingCart, Users } from "lucide-react";

export default async function Dashboard() {

  const links = [
    { name: 'Productos', href: '/dashboard/products', target: '', description: 'Administrar productos', icon: <Package />},
    { name: 'Usuarios', href: '/dashboard/users', target: '', description: 'Administrar usuarios', icon: <Users /> },
    { name: 'Pedidos', href: '/dashboard/orders', target: '', description: 'Administrar pedidos', icon: <ShoppingCart />},
    { name: 'WEBSITE', href: '/products', target: '_blank', description: 'Ir a la página web', icon: <Chrome />}
  ]


  return (
    <div className="flex flex-wrap">    
      {
        links.map((link, index) => (
          <Link key={index} href={link.href} target={link.target} className="w-60">
            <Card className="m-4 hover:bg-gray-100">
              <CardHeader className="flex flex-row gap-1">
                {link.icon && link.icon}
                {link.name}
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  {link.description}
                </p>
              </CardContent>
            </Card>
          </Link>
          
        ))
      }
    </div>
  );
}
