import { Table, TableBody, TableCaption, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { fetchUsers } from "../../utils/actions/users/fetchs"
import ItemUser from "../../../components/Usuario/item-user";

export default async function Users() {

  const users = await fetchUsers();

  return(
    <Table>
      <TableCaption className="caption-top mb-4">Listado de usuarios</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Email</TableHead>
          <TableHead>Nombre</TableHead>
          <TableHead>Apellido</TableHead>
          <TableHead>Rol</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {users?.map((user) => (
          <ItemUser key={user.id} usuario={user} />
        ))}
      </TableBody>
    </Table>
  )
};
