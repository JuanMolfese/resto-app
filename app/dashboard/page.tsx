import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { fetchProducts } from "../utils/actions/products/fetchs";
import Link from "next/link";

export default async function Dashboard() {

  const links = [
    { name: 'Productos', href: '/dashboard/products', target: '', description: 'Administrar productos'},
    { name: 'Usuarios', href: '/dashboard/users', target: '', description: 'Administrar usuarios'},
    { name: 'Pedidos', href: '/dashboard/orders', target: '', description: 'Administrar pedidos'},
    { name: 'WEBSITE', href: '/products', target: '_blank', description: 'Ir a la página web'},
  ]

  return (
    <div className="flex">    
      {
        links.map((link, index) => (
          <Link key={index} href={link.href} target={link.target}>
            <Card className="m-4">
              <CardHeader>
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
