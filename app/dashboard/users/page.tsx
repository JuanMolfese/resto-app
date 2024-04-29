import { Table, TableBody, TableCaption, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { fetchUserByEmail, fetchUsers, getRoles } from "../../utils/actions/users/fetchs"
import ItemUser from "../../../components/Usuario/item-user";
import { useSession } from "next-auth/react";
import { getServerSession } from "next-auth";


export default async function Users() {

  const users = await fetchUsers();
  const user = await getServerSession();
  const roles = await getRoles();
  const data_user = await fetchUserByEmail(user?.user?.email!);

  return(
    <Table>
      <TableCaption className="caption-top mb-4">Listado de usuarios</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Email</TableHead>
          {/* <TableHead>Nombre</TableHead>
          <TableHead>Apellido</TableHead> */}
          <TableHead>Rol</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {users?.map((user) => (
          <ItemUser key={user.id} usuario={user} user={data_user} roles={roles} />
        ))}
      </TableBody>
    </Table>
  )
};
