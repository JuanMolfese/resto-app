import { Badge } from "@/components/ui/badge";
import { fetchStatus } from "../../utils/actions/pedidos/status/fetchs"
import Link from "next/link";

export default async function Orders() {

  const status = await fetchStatus(); 

  return(
    <div className="flex">
      {status?.map((status) => (
        <Link key={status.id} href={`/dashboard/orders/${status.id}`}>
          <Badge key={status.id} variant="outline" className="mr-2">
            {status.descripcion}
          </Badge>
        </Link>
      ))}
    </div>
  )
};
